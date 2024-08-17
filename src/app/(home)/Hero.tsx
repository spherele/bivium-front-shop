'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import { Swiper as SwiperInstance } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '@/components/ui/Button/Button';

import styles from './Hero.module.css';

import { IMetaHomepageResponse } from '@/api/models';
import { formatUrl } from '@/utils/formatUrl';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

interface Props {
  slides: IMetaHomepageResponse['heroCarousel'];
}

const Hero: FC<Props> = ({ slides }) => {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <Swiper
        className={styles.carousel}
        wrapperClass={styles.carouselWrapper}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={false} // No need to loop since it's no longer an array of slides
      >
        <SwiperSlide
          className={styles.carouselSlide}
          style={{
            '--picture': `url(${formatUrl(slides.picture)})`,
            '--picture-mobile': `url(${formatUrl(slides.pictureMobile ?? slides.picture)})`
          }}
        >
          <div className={classNames(styles.carouselSlideContainer, 'container')}>
            <div className={styles.carouselSlideTitle}>Важно достичь баланс</div>
            <div className={styles.carouselSlideSubtitle}>
              Новая коллекция
              <br />
              Весна-Лето 2024
            </div>
            <div className={styles.carouselSlideFooter}>
              <Button
                className={styles.carouselSlideButton}
                variant='negative'
                onClick={() => router.push('/about-company')}
              >
                Узнать больше
              </Button>
              <div className={styles.carouselSlideDescription}>
                <span style={{ fontSize: '20px' }}>Реунков Алексей</span>
                <br />
                <span style={{ fontSize: '15px' }}>
                  марафонец, участник олимпийских игр и<br />
                  бронзовый призер чемпионата Европы
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

SwiperInstance.use([Autoplay]);
export default Hero;
