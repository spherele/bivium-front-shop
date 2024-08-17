'use client';

import { FC, ComponentProps, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';
import ArrowsRightIcon from '@icons/arrows-right.svg';

type Variants = 'default' | 'negative' | 'deselected' | 'inactive' | 'secondary';

interface Props extends ComponentProps<'button'> {
  variant: Variants;
  icon?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, variant, icon, className, ...rest } = props;

  const variantMap: {
    [K in Variants]: string;
  } = {
    default: styles.default,
    negative: styles.defaultNegative,
    deselected: styles.deselected,
    inactive: styles.inactive,
    secondary: styles.secondary
  };

  return (
    <button ref={ref} className={classNames(styles.button, variantMap[variant], className)} {...rest}>
      {children}
      {(!!icon || icon === undefined) && <ArrowsRightIcon />}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
