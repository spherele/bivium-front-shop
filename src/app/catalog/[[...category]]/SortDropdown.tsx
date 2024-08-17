'use client';

import { FC, Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import classNames from 'classnames';

import Button from '@/components/ui/Button/Button';
import CheckmarkIcon from '@icons/checkmark.svg';

import { useMediaQuery } from 'react-responsive';

import styles from './SortDropdown.module.css';

interface Props {
  sortType: SortType;
  setSortType: Dispatch<SetStateAction<SortType>>;
}

const sortMap = {
  popular: 'Популярные',
  descendingPrice: 'По убыванию цены',
  ascendingPrice: 'По возрастанию цены',
  newest: 'Новинки'
};

const SortDropdown: FC<Props> = ({ sortType, setSortType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 1280 });

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(isMobile ? { crossAxis: -70, mainAxis: offsetY } : { mainAxis: offsetY })],
    placement: 'bottom',
    whileElementsMounted: autoUpdate
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context)
  ]);

  const onSelect = (sortType: SortType) => {
    setSortType(sortType);
    setIsOpen(false);
  };

  useEffect(() => {
    const buttonRef = refs.reference;
    if (buttonRef !== null) {
      setOffsetY(parseFloat(`-${getComputedStyle(buttonRef.current as HTMLButtonElement).height}`) - 3);
    }
  }, [refs.reference]);

  return (
    <>
      <Button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={styles.button}
        variant='secondary'
        type='button'
      >
        {sortMap[sortType]}
      </Button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div className={styles.dropdown} ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
            {Object.keys(sortMap).map((key, keyIndex) => (
              <Button
                key={keyIndex}
                className={classNames(styles.button, styles.buttonDropdownItem)}
                disabled={sortType === key}
                variant='secondary'
                icon={false}
                onClick={() => onSelect(key as SortType)}
              >
                {sortType === key && <CheckmarkIcon />}
                {sortMap[key as SortType]}
              </Button>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

export default SortDropdown;
