import { FC } from 'react';
import classNames from 'classnames';

import Item from './Item';

import { Breadcrumb } from './models/Breadcrumb';

import styles from './Breadcrumbs.module.css';

interface Props {
  className?: string;
  breadсrumbs: [Breadcrumb, ...Breadcrumb[]];
  withArrow?: boolean;
}

const Breadcrumbs: FC<Props> = ({ className, breadсrumbs, withArrow }) => {
  return (
    <div className={classNames(className, styles.wrapper)}>
      {breadсrumbs.length > 1 ? (
        breadсrumbs.map((breadсrumb, breadсrumbIndex) => (
          <Item
            key={breadсrumbIndex}
            name={breadсrumb.name}
            path={breadсrumb.path}
            withArrow={!breadсrumbIndex && withArrow}
            withSlash={!!breadсrumbIndex}
          />
        ))
      ) : (
        <Item name={breadсrumbs[0].name} path={breadсrumbs[0].path} withArrow />
      )}
    </div>
  );
};

export default Breadcrumbs;
