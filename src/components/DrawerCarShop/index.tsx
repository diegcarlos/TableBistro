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
      />
      <FooterShop
        onFinish={() => {
          onFinish?.();
          onClose?.(false);
        }}
        countItems={cartItems?.length}
        subTotal={cartItems?.reduce((a, b) => a + b.total, 0)}
      />
    </Drawer>
  );
}
