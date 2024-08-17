'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button/Button';
import styles from './Empty.module.css';

const Empty: FC = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        В избранном
        <br />
        пока пусто
      </div>
      <Button className={styles.button} variant='default' icon={false} onClick={() => router.push('/catalog')}>
        Перейти к покупкам
      </Button>
    </div>
  );
};

export default Empty;
