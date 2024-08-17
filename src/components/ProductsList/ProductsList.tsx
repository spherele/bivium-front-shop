'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import ProductCard from '../ui/ProductCard/ProductCard';
import { IProductCard } from '@/models';

import { formatUrl } from '@/utils/formatUrl';

import styles from './ProductsList.module.css';

interface Props {
  title?: string;
  products: IProductCard[];
  className?: string;
}

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const ProductsList: FC<Props> = ({ title, products, className }) => {
  return (
    <section className={className}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>
        <MediaQuery minWidth={1281}>
          {!!products &&
            products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={formatUrl(product.image)}
                inStock={product.inStock}
              />
            ))}
        </MediaQuery>
        <MediaQuery maxWidth={1280}>
          <Swiper
            className={styles.carousel}
            wrapperClass={styles.carouselWrapper}
            slidesPerView={products.length > 1 ? 2 : 1}
            spaceBetween={30}
            pagination={{
              enabled: products.length > 1,
              type: 'bullets',
              horizontalClass: styles.carouselBullets,
              bulletClass: styles.carouselBulletsItem,
              bulletActiveClass: styles.carouselBulletsItem_active
            }}
            modules={[Pagination]}
          >
            {products.map(product => (
              <SwiperSlide key={product.id} className={styles.carouselSlide}>
                <ProductCard
                  className={styles.product}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={formatUrl(product.image)}
                  inStock={product.inStock}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </MediaQuery>
      </div>
    </section>
  );
};

export default ProductsList;
