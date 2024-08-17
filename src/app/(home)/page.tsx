import { FC } from 'react';
import classNames from 'classnames';

import Hero from './Hero';
import Catalog from './Catalog';
import Banner from './Banner';
import Lookbooks from './Lookbooks';
import AmbassadorsProducts from '@/components/AmbassadorsProducts/AmbassadorsProducts';
import Description from './Description';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';
import NewsSection from './NewsSection';

import api from '@/api';
import { IMetaHomepageResponse, INewsItemListResponse } from '@/api/models';

import styles from './page.module.css';

const Page: FC = async () => {
  const meta = await api.get('meta/homepage/').json<IMetaHomepageResponse>();
  const initialNewsResponse = await api.get('news/').json<INewsItemListResponse>();

  return (
    <main className={styles.wrapper}>
      <Hero slides={meta.heroCarousel} />
      <Catalog />
      <Banner
        title='Партнёрам'
        subtitle='Внимание нашим будущим'
        picture={meta.banner.picture}
        mobilePicture={meta.banner.pictureMobile}
      />
      <Lookbooks
        items={meta.lookBooks.map(book => ({
          topText: book.topText,
          bottomText: book.bottomText,
          picture: book.picture,
          mobilePicture: book.pictureMobile,
          link: book.link
        }))}
      />
      <Banner
        className={styles.bannerAmbassadors}
        title='Наши амбассадоры'
        subtitle='Знакомьтесь,'
        picture={meta.thirdBanner.picture}
        mobilePicture={meta.thirdBanner.pictureMobile}
      />
      <div className={classNames(styles.ambassadorsProducts, 'container')}>
        <AmbassadorsProducts />
      </div>
      <NewsSection items={initialNewsResponse.items} />
      <Description title={meta.description.title} text={meta.description.text} />
      <section className='container'>
        <DeliveryInformation className={styles.deliveryInformation} withButton />
      </section>
    </main>
  );
};

export default Page;
