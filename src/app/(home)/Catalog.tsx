'use client';

import { FC } from 'react';
import classNames from 'classnames';

import Link from 'next/link';
import dynamic from 'next/dynamic';

import styles from './Catalog.module.css';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const Catalog: FC = () => {
  return (
    <section className={classNames(styles.container, 'container')}>
      <Link className={styles.card} href='/catalog/mens-running'>
        Мужская
        <br />
        экипировка
      </Link>
      <Link className={styles.card} href='/catalog/womens-running'>
        Женская
        <br />
        экипировка
      </Link>
      <Link className={styles.card} href='/catalog/mens-clothing'>
        <MediaQuery minWidth={1281}>
          Мужская
          <br />
          одежда
        </MediaQuery>
        <MediaQuery maxWidth={1280}>Мужская одежда</MediaQuery>
      </Link>
      <Link className={styles.card} href='/catalog/womens-clothing'>
        <MediaQuery minWidth={1281}>
          Женская
          <br />
          одежда
        </MediaQuery>
        <MediaQuery maxWidth={1280}>Женская одежда</MediaQuery>
      </Link>
      <Link className={styles.card} href='/catalog/accessories'>
        Аксессуары
      </Link>
    </section>
  );
};

export default Catalog;
