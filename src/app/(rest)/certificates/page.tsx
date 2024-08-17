import { FC } from 'react';
import Article from '@/components/Article/Article';
import styles from './page.module.css';

const Page: FC = () => {
  return (
    <Article
      breadсrumbs={[
        { name: 'О компании', path: '/about-company' },
        { name: 'Сертификаты', path: '/certificates' }
      ]}
      title='Сертификаты'
      content={
        <>
          Сертификаты соответствия - это документы, подтверждающие соответствие всем соответствующим требованиям в
          министерских законах текущего государства, установленными в обязательном порядке.
          <div className={styles.certificates}>
            <div className={styles.certificatesItem}>
              <div className={styles.certificatesItemTitle}>Сертификат №1</div>
              <img className={styles.certificatesItemImage} src='/images/certificate1.png' alt='' />
            </div>
            <div className={styles.certificatesItem}>
              <div className={styles.certificatesItemTitle}>Сертификат №2</div>
              <img className={styles.certificatesItemImage} src='/images/certificate2.png' alt='' />
            </div>
          </div>
        </>
      }
    />
  );
};

export default Page;
