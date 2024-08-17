'use client';

import { FC, useState, useEffect, useRef } from 'react';

import ProductsList from '../ProductsList/ProductsList';

import api from '@/api';
import { IProductCard } from '@/models';

interface Props {
  relatedTo: number;
  initialProducts?: IProductCard[];
  className?: string;
}

const RelatedProducts: FC<Props> = ({ className, relatedTo, initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (initialProducts !== undefined) {
      return;
    }

    const abortController = abortControllerRef.current;

    api
      .get(`products/${relatedTo}/?similar`, {
        signal: abortController.signal
      })
      .json<IProductCard[]>()
      .then(products => setProducts(products));

    return () => abortController.abort('aborted');
  }, [relatedTo, initialProducts]);

  return <ProductsList className={className} title='Похожие товары' products={products ?? []} />;
};

export default RelatedProducts;
