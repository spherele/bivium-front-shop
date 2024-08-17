import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';

interface Props {
  children: ReactNode;
  className?: string;
  title?: string;
}

const Card: FC<Props> = ({ children, className, title }) => {
  return (
    <div className={classNames(className, styles.wrapper)}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};

export default Card;
