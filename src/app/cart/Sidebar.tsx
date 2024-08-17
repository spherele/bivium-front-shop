'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import InformationText from '@/components/ui/InformationText/InformationText';
import Button from '@/components/ui/Button/Button';
import SSLInformation from '@/components/ui/SSLInformation/SSLInformation';

import api from '@/api';
import { formatPrice } from '@/utils/formatPrice';

import styles from './Sidebar.module.css';

interface Props {
  productsAmount: number;
  totalPice: number;
}

const Sidebar: FC<Props> = ({ productsAmount, totalPice }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Ваши покупки</div>
      <div className={styles.purchases}>
        <div className={styles.purchasesAmount}>{productsAmount} покупки</div>
        <div className={styles.purchasesPrice}>{formatPrice(totalPice)}</div>
      </div>
      <InformationText className={styles.informationText} text='Стоимость доставки будет добавлена к сумме заказа' />
      <div className={styles.summary}>
        <div className={styles.summaryText}>Итог:</div>
        <div className={styles.summaryPrice}>{formatPrice(totalPice)}</div>
      </div>
      <Button
        className={styles.orderButton}
        variant='negative'
        icon={false}
        onClick={() => router.push('/order/create')}
      >
        Перейти к заказу
      </Button>
      <SSLInformation className={styles.sslInformation} />
    </div>
  );
};

export default Sidebar;
