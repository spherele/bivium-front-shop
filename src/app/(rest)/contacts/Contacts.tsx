import { FC } from 'react';
import styles from './Contacts.module.css';

import { formatUrl } from '@/utils/formatUrl';
import { IMetaContactspageResponse } from '@/api/models';

interface Props {
  contacts: IMetaContactspageResponse['topBlock'];
}

const Contacts: FC<Props> = ({ contacts }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <h1 className={styles.title}>Контакты</h1>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.itemTitle}>E-mail</div>
            <a className={styles.itemText} href={`mailto:${contacts.email}}`}>
              {contacts.email}
            </a>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Телефон</div>
            <a className={styles.itemText} href={`tel:${contacts.phone}`}>
              {contacts.phone}
            </a>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>{contacts.addressCity}</div>
            <div className={styles.itemText}>{contacts.addressMain}</div>
          </div>
        </div>
      </div>
      <img className={styles.image} src={formatUrl(contacts.picture)} alt='' />
    </div>
  );
};

export default Contacts;
