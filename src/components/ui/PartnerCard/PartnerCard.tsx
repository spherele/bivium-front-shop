import { FC } from 'react';
import classNames from 'classnames';
import styles from './PartnerCard.module.css';

interface Props {
  image: string;
  name: string;
  address: string;
  phonenumber: string;
  email: string;
  className?: string;
}

const PartnerCard: FC<Props> = ({ image, name, address, phonenumber, email, className }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <img className={styles.image} src={image} alt='' />
      <div className={styles.boldText}>{name}</div>
      <div className={styles.thinText}>{address}</div>
      <a className={styles.boldText} href={`tel:${phonenumber}`}>
        {phonenumber}
      </a>
      <a className={classNames(styles.boldText, styles.email)} href={`mailto:${email}`}>
        {email}
      </a>
    </div>
  );
};

export default PartnerCard;
