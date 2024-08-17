'use client';

import { FC } from 'react';
import styles from './SizeSelector.module.css';

import { Size } from './models/Size';

interface Props {
  sizes: Size[];
  onChangeCallback?: (size: Size) => void;
}

const SizeSelector: FC<Props> = ({ sizes, onChangeCallback }) => {
  return (
    <div className={styles.wrapper}>
      {sizes.map((size, sizeIndex) => (
        <label key={sizeIndex} className={styles.sizeButton}>
          <input
            type='radio'
            name='size'
            value={size.value}
            defaultChecked={size.checked}
            disabled={size.disabled}
            onChange={() => !!onChangeCallback && onChangeCallback(size)}
          />
          {size.name.match(/^(\w+)\(/) !== null ? size.name.match(/^(\w+)\(/)?.[1] : size.name}
        </label>
      ))}
    </div>
  );
};

export default SizeSelector;
