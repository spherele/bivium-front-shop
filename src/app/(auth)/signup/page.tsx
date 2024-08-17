import { FC } from 'react';
import classNames from 'classnames';
import styles from './page.module.css';

import Form from './Form';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';

const Page: FC = () => {
  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <h1 className={styles.title}>Регистрация</h1>
      <Form />
      <DeliveryInformation className={styles.deliveryInfo} />
    </main>
  );
};

export default Page;
