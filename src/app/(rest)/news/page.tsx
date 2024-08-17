'use client';

import { FC, useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { INewsItemListResponse } from '@/api/models';
import { INewsItemList } from '@/models';
import { formatDate } from '@/utils/formatDate';
import { formatUrl } from '@/utils/formatUrl';

import NewsItem from './NewsItem';

import styles from './page.module.css';
import classNames from 'classnames';

import api from '@/api';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';

const NewsList: FC = () => {
  const [news, setNews] = useState<INewsItemList[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [hasMore, setHasMore] = useState(0 > 0);
  const [isLoading, setIsLoading] = useState(false);
  const loadRef = useRef<HTMLDivElement | null>(null);

  const fetchNews = useCallback(
    (newOffset: number) => {
      setIsLoading(true);

      api
        .get('news/', {
          searchParams: new URLSearchParams({
            limit: limit.toString(),
            offset: newOffset.toString()
          })
        })
        .json<INewsItemListResponse>()
        .then(response => {
          if (response && response.items.length > 0) {
            setNews(prevNews => {
              const existingIds = new Set(prevNews.map(item => item.id));
              const newItems = response.items.filter(item => !existingIds.has(item.id));
              return [...prevNews, ...newItems];
            });
            setOffset(newOffset + limit);
            setHasMore(response.total > newOffset + limit);
          } else {
            setHasMore(false);
          }
          setIsLoading(false);
        });
    },
    [limit]
  );

  const showMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchNews(offset);
    }
  }, [isLoading, hasMore, offset, fetchNews]);

  useEffect(() => {
    if (0 === 0) {
      fetchNews(0);
    }
  }, [fetchNews]);

  useEffect(() => {
    const dddd = loadRef.current;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          showMore();
        }
      },
      {
        threshold: 1.0
      }
    );

    if (dddd) {
      observer.observe(dddd);
    }

    return () => {
      if (dddd) {
        observer.unobserve(dddd);
      }
    };
  }, [showMore]);

  const newsItems = useMemo(() => {
    return news.map(newsItem => (
      <NewsItem
        key={newsItem.id}
        id={newsItem.id}
        image={formatUrl(newsItem.image)}
        name={newsItem.name}
        date={formatDate(newsItem.date)}
        description={newsItem.description}
      />
    ));
  }, [news]);

  return (
    <main className={classNames(styles.container, 'container')}>
      <Breadcrumbs
        className={styles.breadcrumbs}
        breadсrumbs={[
          { name: 'На главную', path: '/' },
          { name: 'О компании', path: '/about-company' }
        ]}
        withArrow
      />
      <div className={styles.header}>
        <h1 className={styles.title}>Новости СМИ</h1>
      </div>
      <div className={styles.content}>{newsItems}</div>
      {hasMore && <div className={styles.footer} ref={loadRef}></div>}
      <DeliveryInformation className={styles.deliveryInfo} withButton />
    </main>
  );
};

export default NewsList;
