'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';

import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import Button from '../Button/Button';

import ReturnArrowIcon from '@icons/return-arrow.svg';
import TruckIcon from '@icons/truck.svg';
import Warranty from '@icons/warranty.svg';
import MailOpen from '@icons/mail-open.svg';

import styles from './DeliveryInformation.module.css';

interface Props {
  className?: string;
  withButton?: boolean;
}

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const DeliveryInformation: FC<Props> = ({ className, withButton }) => {
  const router = useRouter();

  return (
    <div className={classNames(className, styles.wrapper)}>
      <div className={styles.grid}>
        <div className={styles.gridItem}>
          <div className={styles.gridItemIcon}>
            <ReturnArrowIcon />
          </div>
          14 дней на возврат
        </div>
        <div className={styles.gridItem}>
          <div className={styles.gridItemIcon}>
            <Warranty />
          </div>
          <MediaQuery minWidth={1281}>60 дней гарантии на каждый товар</MediaQuery>
          <MediaQuery maxWidth={1280}>60 дней гарантии</MediaQuery>
        </div>
        <div className={styles.gridItem}>
          <div className={styles.gridItemIcon}>
            <TruckIcon />
          </div>
          Быстрая доставка (от 5 дней)
        </div>
        <div className={styles.gridItem}>
          <div className={styles.gridItemIcon}>
            <MailOpen />
          </div>
          Подписаться на рассылку
        </div>
      </div>
      {withButton && (
        <Button className={styles.button} variant='default' type='button' onClick={() => router.push('/about-company')}>
          Узнать больше
        </Button>
      )}
    </div>
  );
};

export default DeliveryInformation;
