import { ComponentProps, forwardRef } from 'react';
import ReactInputMask, { Props as InputMaskProps } from 'react-input-mask';
import classNames from 'classnames';
import styles from './Input.module.css';

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'> & Partial<Pick<InputMaskProps, 'mask'>>>(
  (props, forwardedRef) => {
    const { className, mask, ref, ...rest } = props;
    return mask ? (
      <ReactInputMask
        inputRef={forwardedRef}
        className={classNames(styles.control, className)}
        mask={mask}
        maskChar={null}
        {...rest}
      />
    ) : (
      <input ref={forwardedRef} className={classNames(styles.control, className)} {...rest} />
    );
  }
);

Input.displayName = 'Input';
export default Input;
