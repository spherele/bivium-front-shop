import { FC } from 'react';
import { INewsItemDetail, INewsItemListResponse } from '@/api/models';
import { formatDate } from '@/utils/formatDate';
import { formatUrl } from '@/utils/formatUrl';
import { notFound } from 'next/navigation';

import classNames from 'classnames';
import styles from './page.module.css';

import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';

import api from '@/api';

interface Props {
  params: { id: string };
}

const NewsDetailPage: FC<Props> = async ({ params: { id } }) => {
  const newsListResponse = await api.get('news/').json<INewsItemListResponse>();
  const newsList = newsListResponse.items;

  const newsItemExists = newsList.some(news => news.id.toString() === id);

  if (!newsItemExists) {
    notFound();
  }

  const newsItems = await api.get(`news/${id}/`).json<INewsItemDetail>();
  const newsItem = Array.isArray(newsItems) ? newsItems[0] : newsItems;

  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <Breadcrumbs
        className={styles.breadcrumbs}
        breadсrumbs={[
          { name: 'Новости', path: '/news' },
          { name: newsItem.name, path: `/news/${newsItem.id}` }
        ]}
        withArrow
      />

      <div className={styles.newsItem}>
        <h1 className={styles.title}>{newsItem.name}</h1>
        <p className={styles.date}>{formatDate(newsItem.date, true, 'short')}</p>

        {newsItem.titleDescription && <p className={styles.title_description}>{newsItem.titleDescription}</p>}

        <div className={styles.content}>
          {newsItem.image && <img src={formatUrl(newsItem.image)} alt={newsItem.name} className={styles.image} />}
          <p className={styles.description} dangerouslySetInnerHTML={{ __html: newsItem.description }} />
        </div>
      </div>

      <Breadcrumbs className={styles.breadcrumb} breadсrumbs={[{ name: 'Главная', path: '/' }]} withArrow />

      <DeliveryInformation className={styles.deliveryInformation} withButton />
    </main>
  );
};

export default NewsDetailPage;
