import { FC } from 'react';
import classNames from 'classnames';
import styles from './InStockStatus.module.css';

interface Props {
  className?: string;
  value: boolean;
}

const InStockStatus: FC<Props> = ({ className, value }) => {
  return (
    <div className={classNames(className, styles.wrapper, value ? styles.inStock : styles.outOfStock)}>
      {value ? 'В наличии' : 'Нет в наличии'}
    </div>
  );
};

export default InStockStatus;
