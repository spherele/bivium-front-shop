import { FC, ReactNode } from 'react';

import Button from '@/components/ui/Button/Button';
import CrossIcon from '@icons/cross.svg';

import styles from './ConfirmDialogPopup.module.css';

interface Props {
  title?: string;
  cancelButtonText: string;
  cancelButtonHandler: () => void;
  submitButtonText: string;
  submitButtonHandler: () => void;
  children?: ReactNode;
}

const ConfirmDialogPopup: FC<Props> = ({
  title,
  cancelButtonText,
  cancelButtonHandler,
  submitButtonText,
  submitButtonHandler,
  children
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <button className={styles.closeButton} type='button' onClick={cancelButtonHandler}>
          <CrossIcon />
        </button>
      </div>
      <div className={styles.body}>{children}</div>
      <div className={styles.footer}>
        <Button
          className={styles.footerButton}
          variant='negative'
          icon={false}
          type='button'
          onClick={submitButtonHandler}
        >
          {submitButtonText}
        </Button>
        <Button
          className={styles.footerButton}
          variant='default'
          icon={false}
          type='button'
          onClick={cancelButtonHandler}
        >
          {cancelButtonText}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDialogPopup;
