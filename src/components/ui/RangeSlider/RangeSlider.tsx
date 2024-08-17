'use client';

import { FC, ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './RangeSlider.module.css';

interface Props {
  min: number;
  max: number;
  step: number;
  value: number[];
  onChange: (value: [min: number, max: number]) => void;
  className?: string;
}

const RangeSlider: FC<Props> = ({ min, max, step, value, onChange, className }) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);

  const trackRef = useRef<HTMLDivElement>(null);
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);

  const onChangeMin = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    minInputRef.current!.style.zIndex = '2';
    maxInputRef.current!.style.zIndex = '1';

    if (value <= maxValue) {
      setMinValue(value);
      onChange([value, maxValue]);
    }
  };

  const onChangeMax = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    minInputRef.current!.style.zIndex = '1';
    maxInputRef.current!.style.zIndex = '2';

    if (value >= minValue) {
      setMaxValue(value);
      onChange([minValue, value]);
    }
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div ref={trackRef} className={styles.track}></div>
      <input
        ref={minInputRef}
        className={classNames(styles.input, styles.input_min)}
        onChange={onChangeMin}
        max={max}
        min={min}
        step={step}
        value={minValue}
        type='range'
      />
      <input
        ref={maxInputRef}
        className={classNames(styles.input, styles.input_max)}
        onChange={onChangeMax}
        max={max}
        min={min}
        step={step}
        value={maxValue}
        type='range'
      />
    </div>
  );
};

export default RangeSlider;
