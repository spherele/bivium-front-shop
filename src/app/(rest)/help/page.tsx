import { FC } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';

import styles from './page.module.css';

const Page: FC = () => {
  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <Breadcrumbs className={styles.breadcrumbs} breadсrumbs={[{ name: 'На главную', path: '/' }]} withArrow />
      <h1 className={styles.title}>Помощь</h1>
      <div className={styles.links}>
        <Link href='/contacts' className={styles.linksItem}>
          Контакты
        </Link>
        <Link href='/sizes' className={styles.linksItem}>
          Размерная таблица
        </Link>
        <Link href='/payment' className={styles.linksItem}>
          Оплата товара
        </Link>
        <Link href='/delivery' className={styles.linksItem}>
          Условия доставки
        </Link>
        <Link href='/return' className={styles.linksItem}>
          Возврат товара
        </Link>
        <Link href='/care' className={styles.linksItem}>
          Знаки и уход за товарами
        </Link>
        <Link href='/promotions' className={styles.linksItem}>
          Акции
        </Link>
      </div>
      <DeliveryInformation className={styles.deliveryInformation} />
    </main>
  );
};

export default Page;
