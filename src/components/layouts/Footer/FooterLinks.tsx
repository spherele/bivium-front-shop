'use client';

import { FC } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import footerStyles from './Footer.module.css';
import footerLinksStyles from './FooterLinks.module.css';

import Accordion from './Accordion';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const FooterLinks: FC = () => {
  return (
    <>
      <MediaQuery minWidth={1281}>
        <div className={footerStyles.row}>
          <div className={footerStyles.links}>
            <div className={footerStyles.linksTitle}>Помощь</div>
            <div className={footerStyles.linksWrapper}>
              <Link className={footerStyles.linksItem} href='/contacts'>
                Контакты
              </Link>
              <Link className={footerStyles.linksItem} href='/sizes'>
                Размерная таблица
              </Link>
              <Link className={footerStyles.linksItem} href='/payment'>
                Оплата товара
              </Link>
              <Link className={footerStyles.linksItem} href='/delivery'>
                Условия доставки
              </Link>
              <Link className={footerStyles.linksItem} href='/return'>
                Возврат товара
              </Link>
              <Link className={footerStyles.linksItem} href='/care'>
                Знаки и уход за товарами
              </Link>
              <Link className={footerStyles.linksItem} href=''>
                Акции
              </Link>
            </div>
          </div>
          <div className={footerStyles.links}>
            <div className={footerStyles.linksTitle}>О компании</div>
            <div className={footerStyles.linksWrapper}>
              <Link className={footerStyles.linksItem} href='/news'>
                Новости
              </Link>
              <Link className={footerStyles.linksItem} href=''>
                Команда
              </Link>
              <Link className={footerStyles.linksItem} href='/manufacturing'>
                О производстве
              </Link>
              <Link className={footerStyles.linksItem} href='/certificates'>
                Сертификаты
              </Link>
              <Link className={footerStyles.linksItem} href='/vacancies'>
                Вакансии
              </Link>
              <Link className={footerStyles.linksItem} href='/contacts'>
                Магазины
              </Link>
              <Link className={footerStyles.linksItem} href='/public-offer'>
                Публичная оферта
              </Link>
              <Link className={footerStyles.linksItem} href='/privacy-policy'>
                Политика конфиденциальности
              </Link>
            </div>
          </div>
          <div className={footerStyles.links}>
            <div className={footerStyles.linksTitle}>Сотрудничество</div>
            <div className={footerStyles.linksWrapper}>
              <Link className={footerStyles.linksItem} href='/conditions'>
                Условия сотрудничества для оптовых покупателей
              </Link>
              <Link className={footerStyles.linksItem} href='/ambassadors'>
                Стать амбасадором или представителем бренда
              </Link>
              <Link className={footerStyles.linksItem} href='/testers'>
                Стать тестировщиком
              </Link>
              <Link className={footerStyles.linksItem} href=''>
                Команда бренда
              </Link>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1280}>
        <div className={footerLinksStyles.wrapper}>
          <Accordion buttonText='О компании'>
            <Link className={footerStyles.linksItem} href='/about-company'>
              О бренде
            </Link>
            <Link className={footerStyles.linksItem} href='/manufacturing'>
              О производстве
            </Link>
            <Link className={footerStyles.linksItem} href='/certificates'>
              Сертификаты
            </Link>
            <Link className={footerStyles.linksItem} href='/vacancies'>
              Вакансии
            </Link>
            <Link className={footerStyles.linksItem} href='/contacts'>
              Магазины
            </Link>
            <Link className={footerStyles.linksItem} href='/public-offer'>
              Публичная оферта
            </Link>
            <Link className={footerStyles.linksItem} href='/privacy-policy'>
              Политика конфиденциальности
            </Link>
          </Accordion>
          <Accordion buttonText='Помощь'>
            <Link className={footerStyles.linksItem} href='/contacts'>
              Контакты
            </Link>
            <Link className={footerStyles.linksItem} href='/sizes'>
              Размерная таблица
            </Link>
            <Link className={footerStyles.linksItem} href='/payment'>
              Оплата товара
            </Link>
            <Link className={footerStyles.linksItem} href='/delivery'>
              Условия доставки
            </Link>
            <Link className={footerStyles.linksItem} href='/return'>
              Возврат товара
            </Link>
            <Link className={footerStyles.linksItem} href='/care'>
              Знаки и уход за товарами
            </Link>
          </Accordion>
          <Accordion buttonText='Сотрудничество'>
            <Link className={footerStyles.linksItem} href='/conditions'>
              Условия сотрудничества для оптовых покупателей
            </Link>
            <Link className={footerStyles.linksItem} href='/ambassadors'>
              Стать амбасадором или представителем бренда
            </Link>
            <Link className={footerStyles.linksItem} href='/testers'>
              Стать тестировщиком
            </Link>
            <Link className={footerStyles.linksItem} href=''>
              Команда бренда
            </Link>
          </Accordion>
        </div>
      </MediaQuery>
    </>
  );
};

export default FooterLinks;
