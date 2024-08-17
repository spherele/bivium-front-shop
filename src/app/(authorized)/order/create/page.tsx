'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import Loading from '@/app/loading';
import Body from './Body';
import Sidebar from './Sidebar';

import api from '@/api';
import { IOrderResponse } from '@/api/models';

import { useAppDispatch } from '@/redux/hooks';
import { cartClear } from '@/redux/slices/cartSlice';

import styles from './page.module.css';

const Page: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [orderData, setOrderData] = useState<IOrderResponse | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    api
      .put('orders/', { signal: abortController.signal })
      .json<IOrderResponse>()
      .then(response => {
        setOrderData(response);
        dispatch(cartClear());
      })
      .catch(error => error !== 'aborted' && router.back());
    return () => abortController.abort('aborted');
  }, [router, dispatch]);

  if (!orderData) {
    return <Loading />;
  }

  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <h1 className={styles.title}>Ваш заказ</h1>
      <div className={styles.content}>
        <Body orderData={orderData} />
        <Sidebar orderData={orderData} />
      </div>
    </main>
  );
};

export default Page;
