'use client;';

import { FC, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import CheckmarkIcon from '@icons/checkmark.svg';
import styles from './PromocodeInput.module.css';

import api from '@/api';

interface IPromocodeResponse {
  previousTotalPrice: number;
  currentTotalPrice: number;
}

interface Props {
  orderId: number;
  onApplied?: (discountPercentage: number | null) => void;
  className?: string;
}

const PromocodeInput: FC<Props> = ({ orderId, onApplied, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [discount, setDiscount] = useState<number | null>(null);

  useEffect(() => {
    if (discount !== null) {
      onApplied && onApplied(discount);
    }
  }, [onApplied, discount]);

  const applyPromocode = () => {
    const input = inputRef.current!;

    if (!input.value.length) {
      input.focus();
      return;
    }

    api
      .patch(`orders/${orderId}/promocode/?apply`, { json: { promocode: input.value } })
      .json<IPromocodeResponse>()
      .then(({ previousTotalPrice, currentTotalPrice }) => {
        const result = ((previousTotalPrice - currentTotalPrice) / previousTotalPrice) * 100;
        setDiscount(result);
        onApplied && onApplied(result);
      })
      .catch(() => {
        input.value = '';
        input.focus();
      });
  };

  const removePromocode = () => {
    const input = inputRef.current!;
    api.patch(`orders/${orderId}/promocode/?remove`, { json: { promocode: input.value } }).json<IPromocodeResponse>();

    setDiscount(null);
    onApplied && onApplied(null);

    input.value = '';
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <input ref={inputRef} className={styles.input} type='text' placeholder='Промокод' disabled={discount !== null} />
      {discount !== null ? (
        <button className={styles.removeButton} type='button' onClick={removePromocode}>
          -{Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(discount).replace(',', '.')}%
          <CheckmarkIcon />
        </button>
      ) : (
        <button className={styles.applyButton} type='button' onClick={applyPromocode}>
          Применить
        </button>
      )}
    </div>
  );
};

export default PromocodeInput;
