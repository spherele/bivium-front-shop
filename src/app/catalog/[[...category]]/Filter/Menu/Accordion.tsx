'use client';

import { FC, ReactNode, useState, useMemo } from 'react';

import PlusIcon from '@icons/plus.svg';
import MinusIcon from '@icons/minus.svg';

import styles from './Accordion.module.css';

interface Props {
  title: string;
  children: ReactNode;
}

const Accordion: FC<Props> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} type='button' onClick={() => setIsExpanded(!isExpanded)}>
        {title}
        {isExpanded ? <MinusIcon /> : <PlusIcon />}
      </button>
      {isExpanded && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;
