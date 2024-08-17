import { FC } from 'react';
import classNames from 'classnames';
import styles from './SSLInformation.module.css';

import LockIcon from '@icons/lock.svg';

interface Props {
  className?: string;
}

const SSLInformation: FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, styles.wrapper)}>
      <LockIcon />
      <div className={styles.body}>
        <div className={styles.title}>SSL-сертификат</div>
        <div className={styles.subtitle}>Ваши данные защищены</div>
      </div>
    </div>
  );
};

export default SSLInformation;
