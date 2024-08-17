'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import ProductsList from '@/components/ProductsList/ProductsList';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import { IProductCard } from '@/models';

import styles from './Order.module.css';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

interface Props {
  id: number;
  products: IProductCard[];
}

const Order: FC<Props> = ({ id, products }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper} onClick={() => router.push(`/order/${id}`)}>
      <div className={styles.title}>Заказ №{id}</div>
      <div className={styles.products}>
        <MediaQuery minWidth={1281}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              inStock={product.inStock}
              small
            />
          ))}
        </MediaQuery>
        <MediaQuery maxWidth={1280}>
          <ProductsList className={styles.productsList} products={products} />
        </MediaQuery>
      </div>
    </div>
  );
};

export default Order;
