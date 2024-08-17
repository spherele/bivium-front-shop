'use client';

import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  FloatingFocusManager,
  autoUpdate,
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole
} from '@floating-ui/react';

import ChevronDown from '@icons/chevron-down.svg';
import styles from './Dropdown.module.css';

interface Item {
  name: string;
  value: any;
  selected?: boolean;
}

interface Props {
  className?: string;
  items: Item[];
  onSelectCallback: (item: Item) => void;
}

const Dropdown: FC<Props> = ({ className, items, onSelectCallback }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(items.find(item => item.selected === true) || null);

  const { refs, floatingStyles, context } = useFloating({
    open: isExpanded,
    onOpenChange: setIsExpanded,
    middleware: [
      {
        name: 'width',
        fn: state => {
          state.elements.floating.style.width = getComputedStyle(state.elements.reference as HTMLButtonElement).width;
          return state;
        }
      }
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom'
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context)
  ]);

  useEffect(() => {
    if (selectedItem === null) {
      return;
    }

    onSelectCallback(selectedItem);
  }, [selectedItem, onSelectCallback]);

  return (
    <>
      <button
        ref={refs.setReference}
        className={classNames(className, styles.button, isExpanded && styles.expanded, selectedItem && styles.selected)}
        type='button'
        {...getReferenceProps()}
      >
        {selectedItem ? selectedItem.name : 'Пожалуйста выберите'}
        <ChevronDown />
      </button>
      {isExpanded && (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} className={styles.menu} style={floatingStyles} {...getFloatingProps()}>
            {items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                className={styles.menuItem}
                type='button'
                onClick={() => {
                  setSelectedItem(item);
                  setIsExpanded(false);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

export default Dropdown;
