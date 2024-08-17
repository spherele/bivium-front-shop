import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

import { getUnixTime, subMonths } from 'date-fns';
import api from '@/api';
import { ICatalogResponse } from '@/api/models';

const useCatalog = (initialProducts: ICatalogResponse['products']) => {
  const searchParams = useSearchParams();

  const filtersState = useAppSelector(selector => selector.filters);
  const [sortType, setSortType] = useState<SortType>('popular');

  const [isLoading, setIsLoading] = useState(false);
  const [catalogState, setCatalogState] = useState({
    offset: 0,
    limit: 8,
    total: 0,
    products: initialProducts
  });

  const filters = useMemo(() => {
    const categories = filtersState.categories
      .filter(category => category.isApplied)
      .map(category => category.id)
      .join(',');

    const colors = filtersState.colors
      .filter(color => color.isApplied)
      .map(color => color.id)
      .join(',');

    const sizes = filtersState.sizes
      .filter(size => size.isApplied)
      .map(size => size.id)
      .join(',');

    return {
      ...(!!!categories && { dateCreate: `${getUnixTime(subMonths(new Date(), 2))},${getUnixTime(new Date())}` }),
      ...(categories && { category: categories }),
      ...(colors && { colors }),
      ...(sizes && { sizes })
    };
  }, [filtersState]);

  const products = useMemo(() => {
    return [...catalogState.products].sort((a, b) => {
      if (sortType === 'ascendingPrice') {
        return a.price - b.price;
      }

      if (sortType === 'descendingPrice') {
        return b.price - a.price;
      }

      if (sortType === 'popular') {
        return b.views - a.views;
      }

      if (sortType === 'newest') {
        return b.uploadedAt - a.uploadedAt;
      }

      return 0;
    });
  }, [catalogState.products, sortType]);

  useEffect(() => {
    const abortController = new AbortController();

    api
      .get(searchParams.has('searchQuery') ? 'catalog/search/' : 'catalog/', {
        signal: abortController.signal,
        searchParams: searchParams.has('searchQuery')
          ? { q: searchParams.get('searchQuery')! }
          : {
              limit: 8,
              offset: 0,
              ...filters
            }
      })
      .json<ICatalogResponse>()
      .then(catalog => {
        setCatalogState(catalogState => ({ ...catalogState, total: catalog.total, products: catalog.products }));
      })
      .finally(() => setIsLoading(false));

    setIsLoading(true);
    return () => abortController.abort('aborted');
  }, [filters, searchParams]);

  const fetchNext = () => {
    if (isLoading) {
      return;
    }

    api
      .get('catalog/', {
        searchParams: {
          limit: catalogState.limit,
          offset: catalogState.offset + catalogState.limit,
          ...filters
        }
      })
      .json<ICatalogResponse>()
      .then(catalog => {
        setCatalogState(catalogState => ({
          ...catalogState,
          offset: catalogState.offset + catalogState.limit,
          products: catalogState.products.concat(catalog.products)
        }));
      })
      .finally(() => setIsLoading(false));

    setIsLoading(true);
  };

  return { sortType, setSortType, products, catalogState, fetchNext };
};

export default useCatalog;
