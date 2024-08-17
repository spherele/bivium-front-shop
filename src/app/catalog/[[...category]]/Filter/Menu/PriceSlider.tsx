'use client';

import { FC, useEffect, useState, useRef } from 'react';
import styles from './PriceSlider.module.css';

import Input from '@/components/ui/Input/Input';
import RangeSlider from '@/components/ui/RangeSlider/RangeSlider';

type Value = [min: number, max: number];

interface Props {
  defaultValue: Value;
  onChange: (value: Value) => void;
}

const setInputWidthByText = (input: HTMLInputElement) => {
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d')!;
  const style = getComputedStyle(input);

  canvasContext.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const textWidth = canvasContext.measureText(input.value).width;

  input.style.width = `${textWidth + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderWidth) * 2}px`;
};

const PriceSlider: FC<Props> = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState<Value>(defaultValue);
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    minInputRef.current!.valueAsNumber = value[0];
    maxInputRef.current!.valueAsNumber = value[1];

    setInputWidthByText(minInputRef.current!);
    setInputWidthByText(maxInputRef.current!);

    onChange(value);
  }, [value, onChange]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputTitle}>от</div>
        <Input
          ref={minInputRef}
          className={styles.input}
          type='number'
          onChange={event =>
            setValue(value => [
              isNaN(event.target.valueAsNumber) ? defaultValue[0] : event.target.valueAsNumber,
              value[1]
            ])
          }
          defaultValue={value[0]}
        />
      </div>
      <div className={styles.inputsSeparator}></div>
      <div className={styles.inputWrapper}>
        <div className={styles.inputTitle}>до</div>
        <Input
          ref={maxInputRef}
          className={styles.input}
          type='number'
          onChange={event =>
            setValue(value => [
              value[0],
              isNaN(event.target.valueAsNumber) ? defaultValue[1] : event.target.valueAsNumber
            ])
          }
          defaultValue={value[1]}
        />
      </div>
    </div>
  );
};

export default PriceSlider;
