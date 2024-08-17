import { FC } from 'react';
import classNames from 'classnames';

import Catalog from './Catalog';
import ExpandableText from '@/components/ui/ExpandableText/ExpandableText';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';

import api from '@/api';
import { ICatalogResponse } from '@/api/models';
import { categoryMap, CategoryCode } from '@/utils/catalogCategoriesMap';

import styles from './page.module.css';

interface Props {
  params: { category: [CategoryCode] | undefined };
  searchParams: { searchQuery?: string };
}

const Page: FC<Props> = async ({ params, searchParams }) => {
  const category =
    params.category !== undefined && params.category[0] in categoryMap ? categoryMap[params.category[0]] : null;

  const { filters, products } = await api
    .get(searchParams.searchQuery ? 'catalog/search/' : 'catalog/', {
      searchParams: searchParams.searchQuery
        ? {
            q: searchParams.searchQuery
          }
        : {
            limit: 8,
            offset: 0,
            ...(category !== null && { category })
          }
    })
    .json<ICatalogResponse>();

  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <Catalog availableFilters={filters} initialProducts={products} categoryId={category} />
      <div className={styles.description}>
        <h2 className={styles.descriptionTitle}>О производстве</h2>
        <ExpandableText className={styles.descriptionText}>
          Наша производственная площадка это: собственный экспериментальный цех в Москве и небольшое производство в
          Подмосковье, которые оснащены оптимальным набором оборудования, отвечающего последнему слову техники:
          -компьютерное проектирование и моделирование будущих изделий, -термический прокрас и нанесение изображения на
          ткань, -лазерный крой, -герметизация швов. Четкий и методичный подход к созданию разумного производства,
          находит свое отражение не только в приобретении и применении высокотехничного оборудования, но и в точном
          расчете оптимального количества сотрудников, а также в нашем стремлении к безотходности.
        </ExpandableText>
      </div>
      <DeliveryInformation className={styles.deliveryInformation} withButton />
    </main>
  );
};

export default Page;
