'use client';

import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './ExpandableText.module.css';

import ChevronDownIcon from '@icons/chevron-down.svg';

interface Props extends PropsWithChildren {
  className?: string;
}

const ExpandableText: FC<Props> = ({ children, className }) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setExpanded] = useState(false);
  const [isExpandButtonShow, setIsExpandButtonShow] = useState(false);

  useEffect(() => {
    if (textRef.current === null) {
      return;
    }

    const lineHeight = getComputedStyle(textRef.current).lineHeight;
    const lineClamp = parseFloat(getComputedStyle(textRef.current).webkitLineClamp);
    const textRowHeight = Math.round(
      parseFloat(getComputedStyle(textRef.current).fontSize) * (lineHeight === 'normal' ? 1.2 : parseFloat(lineHeight))
    );

    setIsExpandButtonShow(textRef.current.scrollHeight > textRowHeight * lineClamp ? true : false);
  }, []);

  return (
    <div className={classNames(className, styles.wrapper)}>
      <div ref={textRef} className={classNames(styles.text, isExpanded && styles.text_expanded)}>
        {children}
      </div>
      {!isExpanded && isExpandButtonShow && (
        <button className={styles.button} type='button' onClick={() => setExpanded(true)}>
          <ChevronDownIcon />
          Читать далее
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
