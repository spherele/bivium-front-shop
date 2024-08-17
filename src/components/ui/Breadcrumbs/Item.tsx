import { FC } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import ChevronLeftIcon from '@icons/chevron-left.svg';

import { Breadcrumb } from './models/Breadcrumb';

import styles from './Item.module.css';

interface Props extends Breadcrumb {
  withArrow?: boolean;
  withSlash?: boolean;
}

const Item: FC<Props> = ({ name, path, withArrow, withSlash }) => {
  return (
    <>
      {withSlash && !withArrow && (
        <span>
          {'\u00A0'}/{'\u00A0'}
        </span>
      )}
      <Link className={classNames(styles.wrapper, withArrow && styles.withArrow)} href={path}>
        {withArrow && !withSlash && <ChevronLeftIcon />}

        {name}
      </Link>
    </>
  );
};

export default Item;
