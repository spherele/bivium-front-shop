'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { SwiperClass } from 'swiper/react';

import { formatUrl } from '@/utils/formatUrl';
import styles from './Carousel.module.css';

interface Props {
  images: string[];
  isAmbassadors: boolean;
}

const Carousel: FC<Props> = ({ images, isAmbassadors }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={classNames(styles.wrapper, isAmbassadors && styles.ambassadorsChoiceBadge)}>
      <Swiper
        thumbs={{ swiper: thumbsSwiper, slideThumbActiveClass: styles.thumbsCarouselSlide_active }}
        className={styles.carousel}
        wrapperClass={styles.carouselWrapper}
        modules={[Thumbs]}
      >
        {images.map((image, imageIndex) => (
          <SwiperSlide
            key={imageIndex}
            className={styles.carouselSlide}
            style={{ backgroundImage: `url(${formatUrl(image)})` }}
          />
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={'auto'}
        className={styles.thumbsCarousel}
        wrapperClass={styles.thumbsCarouselWrapper}
        watchSlidesProgress
      >
        {images.map((image, imageIndex) => (
          <SwiperSlide
            key={imageIndex}
            className={styles.thumbsCarouselSlide}
            style={{ backgroundImage: `url(${formatUrl(image)})` }}
          />
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
