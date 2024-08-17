'use client';

import { FC, useState, useEffect } from 'react';

import Order from './Order';

import api from '@/api';
import { IOrderResponse } from '@/api/models';
import { formatUrl } from '@/utils/formatUrl';

import styles from './page.module.css';

const Page: FC = () => {
  const [orders, setOrders] = useState<IOrderResponse[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    api.get('orders/').json<IOrderResponse[]>().then(setOrders);
    return () => abortController.abort('aborted');
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.amount}>
        <div className={styles.amountText}>Всего заказов:</div>
        <div className={styles.amountValue}>{orders.length}</div>
      </div>
      <div className={styles.orders}>
        {orders.map(order => (
          <Order
            key={order.id}
            id={order.id}
            products={order.items.map(item => ({
              id: item.productId,
              image: formatUrl(item.image),
              name: item.name,
              price: item.price,
              inStock: item.inStock
            }))}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
