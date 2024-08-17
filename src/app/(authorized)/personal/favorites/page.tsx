'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';

import { useAppSelector } from '@/redux/hooks';
import { formatUrl } from '@/utils/formatUrl';

import Empty from './Empty';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import ProductsList from '@/components/ProductsList/ProductsList';

import styles from './page.module.css';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const Page: FC = () => {
  const favorites = useAppSelector(selector => selector.favorites);

  return (
    <div className={styles.wrapper}>
      <MediaQuery maxWidth={1280}>
        <h1 className={styles.title}>Избранное ({favorites.length})</h1>
      </MediaQuery>
      {favorites.length ? (
        <>
          <MediaQuery minWidth={1281}>
            {favorites.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={formatUrl(product.image)}
                name={product.name}
                price={product.price}
                inStock={product.inStock}
              />
            ))}
          </MediaQuery>
          <MediaQuery maxWidth={1280}>
            <ProductsList className={styles.productsList} products={favorites} />
          </MediaQuery>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Page;
