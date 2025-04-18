import {AxiosResponse} from 'axios';
import _ from 'lodash';
import React, {createContext, useContext, useState} from 'react';
import {InteractionManager} from 'react-native';
import {usePrinter} from '../hooks/usePrinter';
import api from '../http/api';
import {PedidoTable} from '../types/pedidoTable';
import {Category} from '../types/products';
import {useAuth} from './AuthContext';

export interface CartItems {
  id: string;
  name: string;
  price: number;
  externoId?: string;
  quantity: number;
  observacao?: string;
  image?: any;
  categoriaId?: string;
  description?: string;
  print?: {host: string; port: number};
  total: number;
  selectedOptions?: {[key: string]: any[]};
}

interface CartContextData {
  cartItems: CartItems[];
  addToCart: (item: CartItems) => void;
  dataWallet: CartItems[];
  setDataWallet: (data: CartItems[]) => void;
  dataProducts: Category[];
  setDataProducts: (data: Category[]) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  getOrderTable: () => Promise<PedidoTable>;
  setIsCartOpen: (isOpen: boolean) => void;
  onFinish: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {mesa} = useAuth();
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [dataWallet, setDataWallet] = useState<CartItems[]>([]);
  const [dataProducts, setDataProducts] = useState<Category[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {printBill} = usePrinter();

  const addToCart = (item: CartItems) => {
    setCartItems(prevItems => {
      //COMENTADO POIS NÃO POSSO AGRUPAR POR PRODUTO POIS COMPLEMENTO PODE VARIAR
      // const existingItem = prevItems.find(prev => prev.name === item.name);
      // if (existingItem) {
      //   return prevItems.map(prev =>
      //     prev.name === item.name
      //       ? {
      //           ...prev,
      //           quantity: prev.quantity + item.quantity,
      //           total: item.price * (prev.quantity + item.quantity),
      //         }
      //       : prev,
      //   );
      // }
      return [...prevItems, {...item, total: item.price * item.quantity}];
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    setCartItems(
      prevItems =>
        prevItems
          .map((item, i) => {
            if (i === index) {
              if (quantity === 0) {
                return null; // Será filtrado fora
              }

              // Atualizar a quantidade e o total
              const updatedItem = {
                ...item,
                quantity,
                total: item.price * quantity,
              };

              // Se houver adicionais, atualizar suas quantidades também
              if (item.selectedOptions) {
                const updatedOptions = Object.entries(
                  item.selectedOptions,
                ).reduce((acc, [key, options]) => {
                  acc[key] = options.map(option => {
                    if ('amount' in option) {
                      // Calcular a quantidade original do adicional (dividindo pela quantidade atual)
                      const originalAmount = option.amount / item.quantity;
                      // Aplicar a nova quantidade
                      return {
                        ...option,
                        amount: Math.round(originalAmount * quantity),
                      };
                    }
                    return option;
                  });
                  return acc;
                }, {} as {[key: string]: any[]});
                updatedItem.selectedOptions = updatedOptions;
              }

              return updatedItem;
            }
            return item;
          })
          .filter(Boolean) as CartItems[],
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getOrderTable = async () => {
    const resp: AxiosResponse<PedidoTable> = await api.get(
      `/pedidos/mesa/${mesa.idMesa}`,
      {params: {status: 'ABERTO'}},
    );
    return resp.data;
  };

  const onFinish = async () => {
    if (cartItems.length > 0 && dataProducts.length > 0) {
      try {
        const isOrders = await getOrderTable();

        // Prepara os dados para impressão
        const printData = cartItems.map(item => {
          const category = dataProducts.find(category => {
            return category.id === item.categoriaId;
          });

          // Processa os adicionais do item
          const adicionais = item.selectedOptions
            ? Object.values(item.selectedOptions).flatMap(options =>
                options
                  .map(option => {
                    if ('amount' in option && 'value' in option) {
                      return {
                        name: `  + ${option.amount}x ${option.name}`,
                        quantity: 1,
                        obs: '',
                        price: option.value * option.amount,
                      };
                    } else if ('text' in option) {
                      return {
                        name: `  + ${option.text}`,
                        quantity: 1,
                        obs: '',
                        price: 0,
                      };
                    }
                    return null;
                  })
                  .filter(
                    (
                      item,
                    ): item is {
                      name: string;
                      quantity: number;
                      obs: string;
                      price: number;
                    } => item !== null,
                  ),
              )
            : [];

          return {
            name: item.name,
            quantity: item.quantity,
            obs: item.observacao || '',
            price: item.price,
            Impressora: category?.Impressora,
            adicionais,
          };
        });

        // Agrupa por impressora
        const groupPrints = _.groupBy(printData, item => item.Impressora?.id);

        // Envia o pedido para a API
        const pedidoData = {
          mesa: mesa.idMesa,
          status: 'ABERTO',
          produtos: cartItems.map(item => {
            return {
              produtoId: item.id,
              externoId: item.externoId,
              obs: item.observacao,
              status: 'PREPARANDO',
              quantidade: item.quantity,
              adicionais: item.selectedOptions
                ? Object.values(item.selectedOptions).flatMap(options =>
                    options.map(option => ({
                      id: option.id || null,
                      codIntegra:
                        'codIntegra' in option ? option.codIntegra : null,
                      quantidade: 'amount' in option ? option.amount : 1,
                      price: option.value || option.price || 0,
                    })),
                  )
                : [],
            };
          }),
        };

        if (!isOrders || !isOrders.id) {
          await api.post('/pedidos', pedidoData);
        } else {
          await api.put(`/pedidos/${isOrders.id}`, {
            id: isOrders.id,
            ...pedidoData,
          });
        }

        // Limpa o carrinho e fecha o drawer
        setDataWallet(cartItems);
        setIsCartOpen(false);
        clearCart();

        // Inicia a impressão após a interação com a UI
        InteractionManager.runAfterInteractions(async () => {
          try {
            for (const [_, value] of Object.entries(groupPrints)) {
              const printer = value[0].Impressora;
              if (!printer) continue;

              const items = value.flatMap(item => {
                const baseItem = {
                  name: item.name,
                  quantity: item.quantity,
                  obs: item.obs,
                  price: item.price,
                };

                return [baseItem, ...item.adicionais];
              });

              const total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              );

              try {
                await printBill(items, total, {
                  printer: {
                    host: printer.ip,
                    port: printer.porta,
                    name: printer.nome,
                  },
                });
              } catch (error) {
                console.error(
                  `Erro ao imprimir na impressora ${printer.nome}:`,
                  error,
                );
              }
            }
          } catch (error) {
            console.error('Erro no processo de impressão:', error);
          }
        });
      } catch (error) {
        console.error('Erro ao finalizar pedido:', error);
        throw error;
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        dataProducts,
        setDataProducts,
        cartItems,
        getOrderTable,
        addToCart,
        removeFromCart,
        dataWallet,
        setDataWallet,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        onFinish,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
