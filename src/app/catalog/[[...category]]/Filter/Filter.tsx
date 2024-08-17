'use client';

import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import {
  useFloating,
  useInteractions,
  autoUpdate,
  offset,
  useClick,
  useDismiss,
  useRole,
  FloatingFocusManager
} from '@floating-ui/react';

import Menu from './Menu/Menu';
import OverlayingPopup from '@/components/popups/OverlayingPopup/OverlayingPopup';
import FilterIcon from '@icons/filter.svg';

import { useAppSelector } from '@/redux/hooks';

import styles from './Filter.module.css';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const Filter: FC = () => {
  const filters = useAppSelector(selector => selector.filters);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset({ mainAxis: (buttonWidth + 5) * -1 })],
    placement: 'right-start',
    whileElementsMounted: autoUpdate
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context)
  ]);

  const appliedFiltersLength = [...filters.categories, ...filters.colors, ...filters.sizes].filter(
    filter => filter.isApplied
  ).length;

  useEffect(() => {
    if (!(refs.reference.current instanceof HTMLButtonElement)) {
      return;
    }

    const button = refs.reference.current as HTMLButtonElement;
    setButtonWidth(parseFloat(getComputedStyle(button).width));
  }, [appliedFiltersLength, refs.reference]);

  return (
    <>
      <MediaQuery minWidth={1281}>
        <button ref={refs.setReference} className={styles.button} type='button' {...getReferenceProps()}>
          <FilterIcon />
          Фильтр ({appliedFiltersLength})
        </button>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <Menu
              ref={refs.setFloating}
              floatingStyles={floatingStyles}
              getFloatingProps={getFloatingProps}
              onClose={() => setIsOpen(false)}
            />
          </FloatingFocusManager>
        )}
      </MediaQuery>
      <MediaQuery maxWidth={1280}>
        <button className={styles.button} type='button' onClick={() => setIsOpen2(true)}>
          <FilterIcon />
          Фильтр ({appliedFiltersLength})
        </button>
        <OverlayingPopup isOpen={isOpen2} onClose={() => setIsOpen2(false)}>
          <Menu className={styles.modalMenu} onClose={() => setIsOpen2(false)} />
        </OverlayingPopup>
      </MediaQuery>
    </>
  );
};

export default Filter;
