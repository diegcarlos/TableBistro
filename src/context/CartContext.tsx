import React, {createContext, useContext, useState} from 'react';
import {Text} from 'react-native';
import {DrawerCarrinho} from '../components/Drawer';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: any;
  description?: string;
}

interface CartContextData {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i =>
          i.name === item.name ? {...i, quantity: i.quantity + 1} : i,
        );
      }
      return [...prevItems, {...item, quantity: 1}];
    });
  };

  const removeFromCart = (itemName: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };

  const updateQuantity = (itemName: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.name === itemName ? {...item, quantity} : item,
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
      }}>
      <DrawerCarrinho
        placement="right"
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}>
        <Text>teste</Text>
      </DrawerCarrinho>
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
