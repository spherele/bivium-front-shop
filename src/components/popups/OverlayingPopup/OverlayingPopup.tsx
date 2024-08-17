'use client';

import { useRef, ReactNode } from 'react';
import styles from './OverlayingPopup.module.css';

import Portal from '@/components/Portal';

type OverlayingPopupProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
};

const OverlayingPopup = ({ children, isOpen, onClose }: OverlayingPopupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        ref={wrapperRef}
        className={styles.wrapper}
        onClick={event => {
          if (event.target === wrapperRef.current) {
            onClose && onClose();
          }
        }}
      >
        {children}
      </div>
    </Portal>
  );
};

export default OverlayingPopup;
