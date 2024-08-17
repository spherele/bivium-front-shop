'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button/Button';

import styles from './EmptyCart.module.css';
const EmptyCart: FC = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src='/images/empty-cart.png' alt='' />
      <div className={styles.body}>
        <h2 className={styles.title}>
          Ваша корзина
          <br />
          пока пуста
        </h2>
        <Button className={styles.button} variant='negative' icon={false} onClick={() => router.push('/catalog')}>
          Перейти к покупкам
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;
