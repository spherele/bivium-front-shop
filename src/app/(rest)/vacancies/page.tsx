import { FC } from 'react';
import Link from 'next/link';

import Article from '@/components/Article/Article';
import ClientPopupButton from '@/components/ClientPopupButton/ClientPopupButton';

import api from '@/api';
import { IVacanciesResponse } from '@/api/models';

import styles from './page.module.css';

const Page: FC = async () => {
  const vacancies = await api.get('vacancies/').json<IVacanciesResponse>();
  const vacanciesSectionsNames = vacancies.map(vacancy => vacancy.division);

  return (
    <Article
      breadсrumbs={[
        { name: 'О компании', path: '/about-company' },
        { name: 'Вакансии', path: '/vacancies' }
      ]}
      title='Вакансии'
      content={
        <>
          <div className={styles.contacts}>
            <div className={styles.contactsItems}>
              <div className={styles.contactsItem}>
                <div className={styles.contactsItemTitle}>Контактное лицо</div>
                <div className={styles.contactsItemValue}>Валентин Воскресенский</div>
              </div>
              <div className={styles.contactsItem}>
                <div className={styles.contactsItemTitle}>Электронная почта</div>
                <div className={styles.contactsItemValue}>
                  <a href='mailto:info@bivium.ru'>info@bivium.ru</a>
                </div>
              </div>
              <div className={styles.contactsItem}>
                <div className={styles.contactsItemTitle}>Телефон</div>
                <div className={styles.contactsItemValue}>
                  <a href='tel:+78005550564'>+7 800 555-05-64</a>
                </div>
              </div>
            </div>
            <div className={styles.contactsButton}>
              <ClientPopupButton
                buttonText='Отправить резюме'
                formTitle='Отправить резюме'
                submitButtonText='Отправить'
                cancelButtonText='Отменить'
                icon={false}
                apiEndpoint='feedback/resume/'
              />
            </div>
          </div>
          <div className={styles.vacancies}>
            {vacanciesSectionsNames.map((sectionName, sectionIndex) => (
              <div key={sectionIndex} className={styles.vacanciesSection}>
                <div className={styles.vacanciesSectionTitle}>{sectionName}</div>
                <div className={styles.vacanciesSectionBody}>
                  {vacancies
                    .filter(vacancy => vacancy.division === sectionName)
                    .map((vacancy, vacancyIndex) => (
                      <Link key={vacancyIndex} className={styles.vacanciesItem} href={`/vacancies/${vacancy.id}`}>
                        <div className={styles.vacanciesItemHeader}>
                          <div className={styles.vacanciesItemTitle}>{vacancy.name}</div>
                          <div className={styles.vacanciesItemSalary}>{vacancy.salary}</div>
                        </div>
                        <div className={styles.vacanciesItemDescription}>
                          {vacancy.city} / {vacancy.experience} / {vacancy.workType}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
};

export default Page;
