'use client';

import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';

import Filter from './Filter/Filter';
import SortDropdown from './SortDropdown';

import ProductCard from '@/components/ui/ProductCard/ProductCard';
import Button from '@/components/ui/Button/Button';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './Catalog.module.css';

import { ICatalogResponse } from '@/api/models';
import { formatUrl } from '@/utils/formatUrl';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addCategory, addColor, addSize, applyCategoryFilter } from '@/redux/slices/filtersSlice';

import useCatalog from './useCatalog';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

interface Props {
  initialProducts: ICatalogResponse['products'];
  availableFilters: ICatalogResponse['filters'];
  categoryId: number | null;
}

const getCategoryFromPath = (path: string): string | null => {
  if (path.startsWith('/catalog/equipment')) return 'Экипировка';
  if (path.startsWith('/catalog/clothing')) return 'Одежда';
  if (path.startsWith('/catalog/accessories')) return 'Аксессуары';
  if (path.startsWith('/catalog')) return 'Новинки';
  return null;
};

const Catalog: FC<Props> = ({ initialProducts, availableFilters, categoryId }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sectionName = getCategoryFromPath(pathname) || 'Каталог';

  const filters = useAppSelector(selector => selector.filters);
  const dispatch = useAppDispatch();

  const {
    sortType,
    setSortType,
    products,
    catalogState: { limit, offset, total },
    fetchNext
  } = useCatalog(initialProducts);

  useEffect(() => {
    availableFilters.sections[0].childitems.forEach(category => {
      dispatch(addCategory({ id: Number(category.id), name: category.name }));
    });

    availableFilters.colors.forEach(color =>
      dispatch(addColor({ id: Number(color.id), code: color.name, hex: 'red' }))
    );

    availableFilters.sizes.forEach(size => dispatch(addSize({ id: Number(size.id), name: size.name })));

    for (const category of filters.categories) {
      dispatch(applyCategoryFilter({ ...category, state: category.id === categoryId }));
    }
  }, [filters, initialProducts, availableFilters, dispatch, categoryId]);

  return (
    <div>
      <div className={styles.header}>
        <MediaQuery minWidth={1281}>
          <div className={styles.headerColumn}>
            <h1 className={styles.title}>{searchParams.has('searchQuery') ? 'Результат поиска' : sectionName}</h1>
            {!searchParams.has('searchQuery') && <Filter />}
          </div>
          <div className={styles.headerColumn}>
            <div className={styles.productsAmount}>{total} товаров</div>
            <SortDropdown sortType={sortType} setSortType={setSortType} />
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={1280}>
          <h1 className={styles.title}>{sectionName}</h1>
          <div className={styles.headerRow}>
            <Filter />
            <SortDropdown sortType={sortType} setSortType={setSortType} />
          </div>
        </MediaQuery>
      </div>
      <div className={styles.content}>
        {products.map(product => (
          <ProductCard
            className={styles.contentItem}
            key={product.id}
            id={product.id}
            image={formatUrl(product.image)}
            name={product.name}
            price={product.price}
            inStock={product.inStock}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.showMoreButton}
          variant='negative'
          type='button'
          icon={false}
          onClick={fetchNext}
          style={{ visibility: !searchParams.has('searchQuery') && offset <= total - limit ? 'visible' : 'hidden' }}
        >
          Показать ещё
        </Button>
        <MediaQuery maxWidth={1280}>
          <div className={styles.productsAmount}>
            {products.length}/{total} товаров
          </div>
        </MediaQuery>
        <div className={styles.footerColumn}>
          <div className={styles.productsAmount}>
            {products.length}/{total} товаров
          </div>
          <SortDropdown sortType={sortType} setSortType={setSortType} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
