import { FC } from 'react';
import classNames from 'classnames';
import styles from './Offer.module.css';

import ExpandableText from '@/components/ui/ExpandableText/ExpandableText';
import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';

import { IMetaHomepageResponse } from '@/api/models';
import { formatUrl } from '@/utils/formatUrl';

interface Props {
  lookBooks: IMetaHomepageResponse['lookBooks'];
  description: IMetaHomepageResponse['description'];
}

const Offer: FC<Props> = ({ lookBooks, description }) => {
  return (
    <section className={classNames(styles.container, 'container')}>
      <div className={styles.cards}>
        {lookBooks.map((card, cardIndex) => (
          <div
            key={cardIndex}
            className={styles.card}
            style={{
              '--picture': `url(${formatUrl(card.picture)})`,
              '--mobile-picture': `url(${formatUrl(card.pictureMobile ? card.pictureMobile : card.picture)})`
            }}
          >
            <div className={styles.cardOfferText}>{card.topText}</div>
            <div className={styles.cardTitle}>{card.bottomText}</div>
          </div>
        ))}
      </div>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>{description.title}</h2>
        <div className={styles.blockDescription}>
          <ExpandableText>{description.text}</ExpandableText>
        </div>
      </div>
      <DeliveryInformation className={styles.deliveryInformation} withButton />
    </section>
  );
};

export default Offer;
