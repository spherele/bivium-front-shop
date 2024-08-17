'use client';

import { FC } from 'react';
import classNames from 'classnames';

import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';
import Cart from './Cart';
import Sidebar from './Sidebar';

import EmptyCart from './EmptyCart';
import PopularProducts from '@/components/PopularProducts/PopularProducts';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';

import { useAppSelector } from '@/redux/hooks';

import styles from './page.module.css';

const Page: FC = () => {
  const cart = useAppSelector(selector => selector.cart);

  return (
    <main className={classNames(styles.container, 'container')}>
      <Breadcrumbs breadсrumbs={[{ name: 'Продолжить покупки', path: '/catalog' }]} />
      <h1 className={styles.title}>Корзина</h1>
      <div className={classNames(styles.wrapper, !!!cart.products.length && styles.wrapper_emptyCart)}>
        {!!!cart.products.length && (
          <>
            <EmptyCart />
            <PopularProducts className={styles.products} />
            <DeliveryInformation className={styles.deliveryInformation} withButton />
          </>
        )}
        {!!cart.products.length && (
          <>
            <Cart />
            <Sidebar
              productsAmount={cart.products.length}
              totalPice={cart.products
                .map(product => product.price * product.amount)
                .reduce((previousValue, currentValue) => previousValue + currentValue)}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Page;
