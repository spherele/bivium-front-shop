'use client';

import { FC, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import Input from '@/components/ui/Input/Input';
import ProductCard from '@/components/ui/ProductCard/ProductCard';

import MailIcon from '@icons/mail.svg';
import CrossIcon from '@icons/cross.svg';

import OverlayingPopup from '@/components/popups/OverlayingPopup/OverlayingPopup';
import ConfirmDialogPopup from '@/components/popups/ConfirmDialogPopup/ConfirmDialogPopup';

import api from '@/api';
import { IProductCard } from '@/models';
import { formatUrl } from '@/utils/formatUrl';

import styles from './page.module.css';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

interface ISubscriptionItem extends Omit<IProductCard, 'id'> {
  offerId: number;
  productId: number;
  subscriptionId: number;
}

const Page: FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [subscriptions, setSubscriptions] = useState<ISubscriptionItem[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    api.get('subscriptions/', { signal: abortController.signal }).json<ISubscriptionItem[]>().then(setSubscriptions);
    return () => abortController.abort('aborted');
  }, []);

  const unsubsribeFromProduct = (id: number) => {
    setSubscriptions(subscriptions => subscriptions.filter(item => item.offerId !== id));
    api.patch(`products/${id}/unsetSubscribe/`);
  };

  return (
    <div className={styles.wrapper}>
      <MediaQuery maxWidth={1280}>
        <div className={styles.pageTitle}>Подписки</div>
      </MediaQuery>
      <div className={styles.title}>Распродажи и скидки</div>
      {isSubscribed && <Input className={styles.emailInput} defaultValue={'example@example.com'} disabled />}
      <button
        className={styles.button}
        type='button'
        onClick={() => {
          if (isSubscribed) {
            setIsModalShown(true);
          } else {
            setIsSubscribed(true);
          }
        }}
      >
        {isSubscribed ? <CrossIcon /> : <MailIcon />}
        {isSubscribed ? 'Отписаться' : 'Подписаться'}
      </button>
      {!!subscriptions.length && (
        <div className={styles.products}>
          <div className={styles.productsTitle}>Поступление товаров</div>
          <div className={styles.productsBody}>
            {subscriptions.map(item => (
              <div key={item.subscriptionId} className={styles.productsItem}>
                <ProductCard
                  id={item.productId}
                  image={formatUrl(item.image)}
                  name={item.name}
                  price={item.price}
                  small
                  inStock={item.inStock}
                />
                <button
                  className={styles.unsubscribeButton}
                  type='button'
                  onClick={() => unsubsribeFromProduct(item.offerId)}
                >
                  Больше не интересует
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <OverlayingPopup isOpen={isModalShown}>
        <ConfirmDialogPopup
          title='Отписаться от рассылки?'
          submitButtonText='Подтвердить'
          submitButtonHandler={() => {
            setIsSubscribed(false);
            setIsModalShown(false);
          }}
          cancelButtonText='Отмена'
          cancelButtonHandler={() => setIsModalShown(false)}
        />
      </OverlayingPopup>
    </div>
  );
};

export default Page;
