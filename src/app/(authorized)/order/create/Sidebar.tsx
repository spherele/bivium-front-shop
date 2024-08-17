'use client';

import { FC } from 'react';

import Card from '@/components/ui/Card/Card';
import ShipmentContent from '@/components/ui/ShipmentContent/ShipmentContent';

import CheckCircleIcon from '@icons/check-circle.svg';

import { formatUrl } from '@/utils/formatUrl';
import { useAppSelector } from '@/redux/hooks';
import { IOrderResponse } from '@/api/models';

import styles from './Sidebar.module.css';

interface Props {
  orderData: IOrderResponse;
}

const Sidebar: FC<Props> = ({ orderData }) => {
  const { email } = useAppSelector(selector => selector.user);

  return (
    <div className={styles.wrapper}>
      <ShipmentContent withPromocode={{ orderId: orderData.id }} products={orderData.items} />
      <Card>
        <div className={styles.email}>
          <div className={styles.emailHeader}>
            <CheckCircleIcon />
            E-Mail адрес
          </div>
          <div className={styles.emailText}>{email}</div>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
