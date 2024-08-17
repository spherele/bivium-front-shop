import { FC } from 'react';

import Article from '@/components/Article/Article';
import ClientPopupButton from '@/components/ClientPopupButton/ClientPopupButton';

import api from '@/api';
import { IVacancy } from '@/api/models';

import { formatUrl } from '@/utils/formatUrl';

import styles from './page.module.css';

interface Props {
  params: { id: string };
}

const Page: FC<Props> = async ({ params: { id } }) => {
  const vacancy = await api.get(`vacancies/${id}/`).json<IVacancy>();

  return (
    <Article
      breadсrumbs={[
        { name: 'О компании', path: '/about-company' },
        { name: 'Вакансии', path: '/vacancies' },
        { name: vacancy.name, path: `/vacancies/${vacancy.id}` }
      ]}
      title={vacancy.name}
      content={
        <div className={styles.wrapper}>
          <img className={styles.image} src={formatUrl(vacancy.image)} alt='' />
          <div className={styles.details}>
            <div className={styles.detailsItem}>
              <div className={styles.detailsItemTitle}>Город</div>
              <div className={styles.detailsItemValue}>{vacancy.city}</div>
            </div>
            <div className={styles.detailsItem}>
              <div className={styles.detailsItemTitle}>Зарплата</div>
              <div className={styles.detailsItemValue}>{vacancy.salary}</div>
            </div>
            <div className={styles.detailsItem}>
              <div className={styles.detailsItemTitle}>Опыт работы</div>
              <div className={styles.detailsItemValue}>{vacancy.experience}</div>
            </div>
            <div className={styles.detailsItem}>
              <div className={styles.detailsItemTitle}>Тип работы</div>
              <div className={styles.detailsItemValue}>{vacancy.workType}</div>
            </div>
          </div>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: vacancy.description }} />
          <div className={styles.button}>
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
      }
    />
  );
};

export default Page;
