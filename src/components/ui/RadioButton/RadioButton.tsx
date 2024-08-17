import { ComponentProps, forwardRef, useId } from 'react';
import classNames from 'classnames';
import styles from './RadioButton.module.css';

interface Props extends ComponentProps<'input'> {
  text?: string;
}

const RadioButton = forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  const controlId = useId();
  const { className, type, text, ...rest } = props;

  return (
    <label className={classNames(className, styles.wrapper)} htmlFor={controlId}>
      <input id={controlId} ref={forwardedRef} className={styles.control} type='radio' {...rest} />
      <div className={styles.text}>{text}</div>
    </label>
  );
});

RadioButton.displayName = 'RadioButton';
export default RadioButton;
