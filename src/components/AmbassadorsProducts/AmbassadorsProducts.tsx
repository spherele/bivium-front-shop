'use client';

import { FC, useState, useEffect, useRef } from 'react';

import ProductsList from '../ProductsList/ProductsList';

import api from '@/api';
import { IProductCard } from '@/models';

interface Props {
  initialProducts?: IProductCard[];
  className?: string;
}

const AmbassadorsProducts: FC<Props> = ({ className, initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (initialProducts !== undefined) {
      return;
    }

    const abortController = abortControllerRef.current;

    api
      .get('products/?ambassadors', {
        signal: abortController.signal
      })
      .json<IProductCard[]>()
      .then(products => setProducts(products));

    return () => abortController.abort('aborted');
  }, [initialProducts]);

  return <ProductsList className={className} title='Амбассадоры BIVIUM выбирают' products={products ?? []} />;
};

export default AmbassadorsProducts;
