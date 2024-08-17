import { ComponentProps, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './TextArea.module.css';

const TextArea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'>>((props, forwardedRef) => {
  const { ref, className, ...rest } = props;
  return <textarea ref={forwardedRef} className={classNames(className, styles.control)} {...rest}></textarea>;
});

TextArea.displayName = 'Textarea';
export default TextArea;
