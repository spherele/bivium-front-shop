'use client';

import { FC } from 'react';
import { INewsItemList } from '@/models';
import { formatDate } from '@/utils/formatDate';
import { formatUrl } from '@/utils/formatUrl';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './NewsSection.module.css';
import classNames from 'classnames';

interface Props {
  items: INewsItemList[];
}

const NewsSection: FC<Props> = ({ items }) => {
  return (
    <section>
      <div className={classNames(styles.header, 'container')}>
        <h1 className={styles.title}>Новости СМИ</h1>
      </div>
      <Swiper
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          2560: {
            slidesPerView: 4
          },
          1200: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 2
          },
          0: {
            slidesPerView: 1
          }
        }}
      >
        {items.map(newsItem => (
          <SwiperSlide key={newsItem.id} className={styles.contentItem}>
            <div>
              <img src={formatUrl(newsItem.image)} alt={newsItem.name} />
              <p>{formatDate(newsItem.date)}</p>
              <Link href={`/news/${newsItem.id}`}>
                <h2>{newsItem.name}</h2>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsSection;
