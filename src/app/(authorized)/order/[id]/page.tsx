'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import classNames from 'classnames';
import { fromUnixTime, format } from 'date-fns';
import { ru } from 'date-fns/locale';

import Loading from '@/app/loading';
import Button from '@/components/ui/Button/Button';
import ShipmentContent from '@/components/ui/ShipmentContent/ShipmentContent';
import Card from '@/components/ui/Card/Card';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';

import api from '@/api';
import { IOrderResponse } from '@/api/models';

import styles from './page.module.css';

interface Props {
  params: { id: string };
}

const Page: FC<Props> = ({ params: { id } }) => {
  const router = useRouter();

  const [orderData, setOrderData] = useState<IOrderResponse | null>(null);
  const [isOrderDataError, setIsOrderDataError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    api
      .get(`orders/${id}/`, { signal: abortController.signal })
      .json<IOrderResponse>()
      .then(setOrderData)
      .catch(error => error !== 'aborted' && setIsOrderDataError(true));

    return () => abortController.abort('aborted');
  }, [id]);

  if (isOrderDataError) {
    notFound();
  }

  if (!orderData) {
    return <Loading />;
  }

  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <h1 className={styles.title}>Спасибо, ждём Вас снова!</h1>
      <h2 className={styles.subtitle}>
        Заказ <u>№{orderData.id}</u> успешно оформлен
      </h2>
      <div className={styles.date}>
        Дата заказа: {format(fromUnixTime(orderData.dateInsert), 'ee MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.orderDetails}>
        <ShipmentContent
          className={styles.shipmentContent}
          deliveryPrice={orderData?.delivery?.price || 0}
          withPromocode={{ discount: orderData.discountPercent || undefined }}
          products={orderData.items}
        />
        <Card className={styles.addressCard} title={`Адрес ${orderData.delivery ? 'доставки' : 'офиса'}`}>
          {orderData.delivery?.address || 'г. Москва, ул. Привольная 56'}
        </Card>
      </div>
      <p className={styles.contacts}>
        Если у вас возникли вопросы, свяжитесь с нами по телефону <a href='tel:88005556564'>8 800 555 65 64</a> или
        отправьте письмо на&ensp;
        <u>
          <a href='mailto:info@bivium.ru'>info@bivium.ru</a>
        </u>
      </p>
      <div className={styles.buttons}>
        <Button className={styles.buttonsItem} variant='negative' icon={false} onClick={() => router.push('/catalog')}>
          Продолжить покупки
        </Button>
        {orderData.receiptUrl && (
          <Button
            className={styles.buttonsItem}
            variant='default'
            icon={false}
            onClick={() => window.open(orderData.receiptUrl!)?.focus()}
          >
            Распечатать квитанцию
          </Button>
        )}
        {orderData.trackUrl && (
          <Button
            className={styles.buttonsItem}
            variant='default'
            icon={false}
            onClick={() => window.open(orderData.trackUrl!)?.focus()}
          >
            Отследить заказ
          </Button>
        )}
      </div>
      <DeliveryInformation className={styles.deliveryInformation} withButton />
    </main>
  );
};

export default Page;
