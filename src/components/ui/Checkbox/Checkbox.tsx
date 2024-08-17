import { ComponentProps, forwardRef, useId } from 'react';
import classNames from 'classnames';
import styles from './Checkbox.module.css';

import SquareIcon from '@icons/square.svg';
import CheckSquareIcon from '@icons/check-square.svg';

interface Props extends ComponentProps<'input'> {
  text?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  const checkboxId = useId();
  const { className, type, text, ...rest } = props;

  return (
    <label className={classNames(className, styles.wrapper)} htmlFor={checkboxId}>
      <input id={checkboxId} ref={forwardedRef} className={styles.control} type='checkbox' {...rest} />
      <SquareIcon />
      <CheckSquareIcon />
      {text && <div className={styles.text}>{text}</div>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
