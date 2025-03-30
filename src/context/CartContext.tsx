import React, {createContext, useContext, useState} from 'react';
import {DrawerCar} from '../components/Drawer';
import {FooterShop} from '../components/FooterShop';
import {ShopItems} from '../components/ShopItems';

export interface CartItems {
  name: string;
  price: number;
  quantity: number;
  image?: any;
  description?: string;
  total: number;
}

interface CartContextData {
  cartItems: CartItems[];
  addToCart: (item: CartItems, index: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  clearCar?: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItems, index: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems?.find((_, i) => i === index);
      console.log(JSON.stringify(existingItem), index);

      if (existingItem) {
        return prevItems.map(i =>
          i.name === item?.name
            ? {
                ...i,
                quantity: i.quantity + 1,
                total: item?.price * (i.quantity + 1),
              }
            : i,
        );
      }
      return [
        ...prevItems,
        {
          ...item,
          quantity: item?.quantity || 1,
          total: item?.total,
        },
      ];
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i === index));
  };

  const clearCar = () => {
    setCartItems([]);
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        clearCar,
      }}>
      <DrawerCar
        placement="right"
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}>
        <ShopItems
          onUpdate={(e, i) => updateQuantity(i, e.quantity)}
          products={cartItems}
        />
        <FooterShop
          onFinish={() => setIsCartOpen(false)}
          countItems={cartItems?.length}
          subTotal={cartItems?.reduce((a, b) => a + b.total, 0)}
        />
      </DrawerCar>
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
