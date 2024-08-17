'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../ui/Button/Button';
import CrossIcon from '@icons/cross.svg';

import styles from './CookieToast.module.css';

const CookieToast: FC = () => {
  const router = useRouter();
  const [isAccepted, setIsAccepted] = useState(!!localStorage.getItem('cookies') || false);

  if (isAccepted) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Cookie-файлы на сайте</div>
      <div className={styles.text}>
        Для обеспечения высокого качества обслуживания и улучшения работы нашего интернет-магазина одежды, мы используем
        файлы cookie. Cookie – это небольшие текстовые файлы, которые сохраняются на вашем устройстве и помогают нам
        узнавать вас при последующих визитах, а также анализировать ваши предпочтения и поведение на сайте.
      </div>
      <div className={styles.buttons}>
        <Button className={styles.button} variant='default' icon={false} onClick={() => router.push('/cookies')}>
          Подробнее
        </Button>
        <Button
          className={styles.button}
          variant='negative'
          icon={false}
          onClick={() => {
            localStorage.setItem('cookies', 'true');
            setIsAccepted(true);
          }}
        >
          Принять все
        </Button>
      </div>
      <CrossIcon className={styles.closeIcon} onClick={() => setIsAccepted(true)} />
    </div>
  );
};

export default CookieToast;
