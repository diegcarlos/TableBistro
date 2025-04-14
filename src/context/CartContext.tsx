import {AxiosResponse} from 'axios';
import _ from 'lodash';
import React, {createContext, useContext, useState} from 'react';
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
  image?: any;
  categoriaId?: string;
  description?: string;
  print?: {host: string; port: number};
  total: number;
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
    setCartItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? {...item, quantity, total: item.price * quantity} : item,
      ),
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
      const isOrders = await getOrderTable();

      if (!isOrders.id) {
        await api.post('/pedidos', {
          mesa: mesa.idMesa,
          status: 'ABERTO',
          produtos: cartItems.map(item => {
            return {
              produtoId: item.id,
              externoId: item.externoId,
              status: 'PREPARANDO',
              quantidade: item.quantity,
            };
          }),
        });
      } else {
        await api.put(`/pedidos/${isOrders.id}`, {
          id: isOrders.id,
          mesa: mesa.idMesa,
          status: 'ABERTO',
          produtos: cartItems.map(item => {
            return {
              produtoId: item.id,
              externoId: item.externoId,
              status: 'PREPARANDO',
              quantidade: item.quantity,
            };
          }),
        });
      }

      setDataWallet(cartItems);
      const print = cartItems.map(item => {
        const category = dataProducts.find(category => {
          return category.id === item.categoriaId;
        });

        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          Impressora: category?.Impressora,
        };
      });

      const groupPrints = _.groupBy(print, item => item.Impressora?.id);

      Object.entries(groupPrints).forEach(([key, value]) => {
        const printer = value[0].Impressora;

        const items = value.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }));

        const total = cartItems.reduce((a, b) => a + b.total, 0);

        if (printer) {
          printBill(items, total, {
            printer: {host: printer.ip, port: printer.port, name: printer.nome},
          });
        }
      });
      setIsCartOpen(false);
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
