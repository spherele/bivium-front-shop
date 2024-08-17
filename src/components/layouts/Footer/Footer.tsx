import { FC } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

import PhoneIcon from '@icons/phone.svg';
import InstagramIcon from '@icons/instagram.svg';
import TelegramIcon from '@icons/telegram.svg';
import VKIcon from '@icons/vk.svg';

import VisaIcon from '@icons/visa.svg';
import MastercardIcon from '@icons/mastercard.svg';
import MirIcon from '@icons/mir.svg';
import YandexPayIcon from '@icons/yandex-pay.svg';

import LogotypeIcon from '@icons/logotype.svg';

import { formatPhoneNumber } from '@/utils/formatPhone';

import FooterLinks from './FooterLinks';

import api from '@/api';
import { IMetaFooterResponse } from '@/api/models';
import ClientPopupButton from '@/components/ClientPopupButton/ClientPopupButton';

const Footer: FC = async () => {
  const meta = await api.get('meta/footer/').json<IMetaFooterResponse>();

  return (
    <footer className={styles.wrapper}>
      <div className='container'>
        <div className={styles.row}>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Обратная связь</h2>
            <h4 className={styles.blockSubtitle}>
              <a className={styles.phonenumberLink} href={`tel:${meta.feedback.phone}`}>
                <PhoneIcon />
                {formatPhoneNumber(meta.feedback.phone)}
              </a>
            </h4>
            <div className={styles.blockBody}>
              <ClientPopupButton
                buttonText='Связаться с нами'
                formTitle='Связаться с нами'
                submitButtonText='Отправить'
                cancelButtonText='Отменить'
                apiEndpoint='feedback/contact-us/'
              />
            </div>
          </div>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Мы в соцсетях</h2>
            <h4 className={styles.blockSubtitle}>{meta.socialNetworks.text}</h4>
            <div className={styles.blockBody}>
              <div className={styles.socialIcons}>
                <a
                  href='https://www.instagram.com/bivium_sportwear?igsh=MXcyNWMxbGxvbGJicw=='
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <InstagramIcon />
                </a>
                <a href='https://t.me/bivium_sw' target='_blank' rel='noopener noreferrer'>
                  <TelegramIcon />
                </a>
                <a href='https://vk.com/bivium_sw' target='_blank' rel='noopener noreferrer'>
                  <VKIcon />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Удобная оплата</h2>
            <h4 className={styles.blockSubtitle}>{meta.paymentInformation.text}</h4>
            <div className={styles.blockBody}>
              <div className={styles.paymentMethods}>
                <div className={styles.paymentMethod}>
                  <VisaIcon />
                </div>
                <div className={styles.paymentMethod}>
                  <MastercardIcon />
                </div>
                <div className={styles.paymentMethod}>
                  <MirIcon />
                </div>
                <div className={styles.paymentMethod}>
                  <YandexPayIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterLinks />
        <div className={styles.bottom}>
          <div className={styles.copyright}>BIVIUM © 2024</div>
          <Link className={styles.logotype} href='/'>
            <LogotypeIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
