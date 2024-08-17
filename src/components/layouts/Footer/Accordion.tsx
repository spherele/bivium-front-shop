'use client';

import { FC, ReactNode, useState } from 'react';
import classNames from 'classnames';
import styles from './Accordion.module.css';

interface Props {
  buttonText: string;
  children: ReactNode;
}

const Accordion: FC<Props> = ({ buttonText, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={classNames(styles.wrapper, isExpanded && styles.expanded)}>
      <button className={styles.button} type='button' onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.buttonText}>{buttonText}</div>
        <div className={styles.buttonIcon}></div>
      </button>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
