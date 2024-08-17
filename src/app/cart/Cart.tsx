import { FC } from 'react';
import styles from './Cart.module.css';

import CartItem from './CartItem';
import InformationText from '@/components/ui/InformationText/InformationText';

import { useAppSelector } from '@/redux/hooks';

const Cart: FC = () => {
  const { products } = useAppSelector(selector => selector.cart);

  return (
    <div className={styles.wrapper}>
      {products.map(product => (
        <CartItem key={product.id} {...product} />
      ))}
      <div className={styles.informationText}>
        <InformationText text='Продукты, помещённые в корзину не резервируются' />
        <InformationText text='Промокоды не суммируются' />
      </div>
    </div>
  );
};

export default Cart;
