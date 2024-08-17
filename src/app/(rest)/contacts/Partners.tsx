import { FC } from 'react';
import styles from './Partners.module.css';

import PartnerCard from '@/components/ui/PartnerCard/PartnerCard';

import { formatUrl } from '@/utils/formatUrl';
import { IMetaContactspageResponse } from '@/api/models';

interface Props {
  partners: IMetaContactspageResponse['partners'];
}

const Partners: FC<Props> = ({ partners }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Магазины-партнёры</div>
      <div className={styles.cities}>
        {partners.map((city, cityIndex) =>
          city.items.length ? (
            <div key={cityIndex} className={styles.city}>
              <div className={styles.cityTitle}>{city.cityName}</div>
              <div className={styles.cityContent}>
                {city.items.map((partner, partnerIndex) => (
                  <PartnerCard
                    key={partnerIndex}
                    className={styles.partnerCard}
                    image={formatUrl(partner.logo)}
                    name={partner.title}
                    address={partner.address}
                    phonenumber={partner.phone}
                    email={partner.email}
                  />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Partners;
