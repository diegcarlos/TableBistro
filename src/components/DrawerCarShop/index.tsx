import React, {useState} from 'react';
import {useCart} from '../../context/CartContext';
import {Drawer} from '../Drawer';
import {FooterShop} from '../FooterShop';
import {ShopItems} from '../ShopItems';

interface Props {
  isOpen?: boolean;
  onClose?: (isOpen: boolean) => void;
}

export function DrawerCarShop(props: Props) {
  const {isOpen, onClose} = props;
  const {cartItems, updateQuantity, onFinish} = useCart();
  const [total, setTotal] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleCheckout = async () => {
    setIsSending(true);
    try {
      await onFinish?.();
      onClose?.(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Drawer
      placement="right"
      title="Seu Carrinho"
      isOpen={isOpen}
      onClose={() => {
        onClose?.(false);
      }}>
      <ShopItems
        onUpdate={(e, i) => updateQuantity(i, e.quantity)}
        products={cartItems}
        onTotalChange={setTotal}
      />
      <FooterShop
        onCheckout={handleCheckout}
        countItems={cartItems?.length}
        subtotal={total}
        loading={isSending}
      />
    </Drawer>
  );
}
