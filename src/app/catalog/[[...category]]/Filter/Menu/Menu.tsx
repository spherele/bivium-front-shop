'use client';

import { CSSProperties, HTMLProps, forwardRef, useState } from 'react';
import classNames from 'classnames';

import Accordion from './Accordion';
import PriceSlider from './PriceSlider';
import Button from '@/components/ui/Button/Button';

import CrossIcon from '@icons/cross.svg';

import styles from './Menu.module.css';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { applyCategoryFilter, applyColorFilter, applySizeFilter } from '@/redux/slices/filtersSlice';

interface Props {
  floatingStyles?: CSSProperties;
  getFloatingProps?: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  onClose: () => void;
  className?: string;
}

const Menu = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { floatingStyles, getFloatingProps, onClose, className } = props;

  const filters = useAppSelector(selector => selector.filters);
  const dispatch = useAppDispatch();

  const appliedFiltersLength = [...filters.categories, ...filters.colors, ...filters.sizes].filter(
    filter => filter.isApplied
  ).length;

  return (
    <div
      ref={ref}
      className={classNames(styles.wrapper, className)}
      style={floatingStyles}
      {...(getFloatingProps && getFloatingProps())}
    >
      <div className={styles.header}>
        <div className={styles.headerTitle}>Фильтр ({appliedFiltersLength})</div>
        <button className={styles.headerCloseButton} type='button' onClick={onClose}>
          <CrossIcon />
        </button>
      </div>
      {!!appliedFiltersLength && (
        <div className={styles.filters}>
          {filters.categories
            .filter(filter => filter.isApplied)
            .map(category => (
              <button
                key={category.id}
                className={styles.filtersButton}
                type='button'
                onClick={() => dispatch(applyCategoryFilter({ id: category.id, state: false }))}
              >
                <CrossIcon />
                {category.name}
              </button>
            ))}
          {filters.colors
            .filter(filter => filter.isApplied)
            .map(color => (
              <button
                key={color.code}
                className={styles.filtersButton}
                type='button'
                onClick={() => dispatch(applyColorFilter({ id: color.id, state: false }))}
              >
                <CrossIcon />
                <div className={styles.colorFiltersButton} style={{ backgroundColor: color.hex }}></div>
              </button>
            ))}
          {filters.sizes
            .filter(filter => filter.isApplied)
            .map(size => (
              <button
                key={size.name}
                className={styles.filtersButton}
                type='button'
                onClick={() => dispatch(applySizeFilter({ id: size.id, state: false }))}
              >
                <CrossIcon />
                {size.name}
              </button>
            ))}
        </div>
      )}
      <div className={styles.body}>
        <Accordion title='Категория'>
          <div className={classNames(styles.textFilters, styles.textFilters_column)}>
            {filters.categories.map(category => (
              <button
                key={category.id}
                className={styles.textFiltersButton}
                type='button'
                onClick={() => dispatch(applyCategoryFilter({ id: category.id, state: true }))}
              >
                {category.name}
              </button>
            ))}
          </div>
        </Accordion>
        <Accordion title='Цвет'>
          <div className={styles.colorFilters}>
            {filters.colors.map(color => (
              <div key={color.id} className={classNames(styles.textFilters, styles.textFilters_column)}>
                <button
                  className={styles.colorFiltersButton}
                  type='button'
                  style={{ backgroundColor: color.hex }}
                  onClick={() => dispatch(applyColorFilter({ id: color.id, state: true }))}
                ></button>
              </div>
            ))}
          </div>
        </Accordion>
        <Accordion title='Размер'>
          <div className={classNames(styles.textFilters, styles.textFilters_row)}>
            {filters.sizes.map(size => (
              <button
                key={size.id}
                className={styles.textFiltersButton}
                type='button'
                onClick={() => dispatch(applySizeFilter({ id: size.id, state: true }))}
              >
                {size.name}
              </button>
            ))}
          </div>
        </Accordion>
        {/* <Accordion title='Цена'>
          <PriceSlider defaultValue={[0, 100_000]} onChange={setPrice} />
        </Accordion> */}
      </div>
    </div>
  );
});

Menu.displayName = 'Menu';
export default Menu;
