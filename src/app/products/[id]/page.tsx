import { FC } from 'react';
import classNames from 'classnames';

import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';
import Product from './Product';
import Description from './Description';
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';

import api from '@/api';
import { IProduct } from '@/models';
import { getCatalogCategoryCodeById, getCatalogCategoryNameByCode } from '@/utils/catalogCategoriesMap';

import styles from './page.module.css';

interface Props {
  params: { id: string };
}

const ProductPage: FC<Props> = async ({ params: { id } }) => {
  if (id === '0') {
    return null;
  }

  const product = await api.get(`products/${id}/`).json<IProduct>();

  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <Breadcrumbs
        className={styles.breadcrumbs}
        breadсrumbs={[
          {
            name: getCatalogCategoryNameByCode(getCatalogCategoryCodeById(product.categoryId)!),
            path: `/catalog/${getCatalogCategoryCodeById(product.categoryId)}`
          },
          { name: product.name, path: `/products/${product.id}` }
        ]}
      />
      <Product {...product} />
      <Description text={product.description} />
      <RelatedProducts className={styles.relatedProducts} relatedTo={product.id} />
      <DeliveryInformation className={styles.deliveryInformation} withButton />
    </main>
  );
};

export default ProductPage;
