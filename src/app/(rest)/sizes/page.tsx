import { FC } from 'react';
import Article from '@/components/Article/Article';
import styles from './page.module.css';

const Page: FC = () => {
  return (
    <Article
      breadсrumbs={[
        { name: 'Помощь', path: '/help' },
        { name: 'Размерная таблица', path: '/sizes' }
      ]}
      title='Размерная таблица'
      content={
        <>
          Данный раздел создан, для того чтобы вы могли легко и безошибочно подобрать свой костюм BIVIUM. Напоминаем
          вам, что стандартно в наших изделиях предусмотрена посадка Slim fit и если вы хотите увеличить степень
          облегания или наоборот добавить свободы, то вам следует выбрать соответственно размер меньше или больше от
          желаемого. Также, на странице каждого товара есть кнопка «таблица размеров», нажав на которую, Вы сможете
          увидеть таблицу замеров для всех размеров данного товара.
          <img className={styles.image} src='/images/sizes.png' alt='' />
          <img className={styles.image} src='/images/sizes-female.png' alt='' />
          <img className={styles.image} src='/images/sizes-kids.png' alt='' />
        </>
      }
    />
  );
};

export default Page;
