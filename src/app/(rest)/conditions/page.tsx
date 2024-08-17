'use client';

import { FC } from 'react';
import Article from '@/components/Article/Article';
import Button from '@/components/ui/Button/Button';
import ConditionsPopupButton from '@/components/ClientPopupButton/ConditionsPopupButton';

import RegistrationIcon from '@icons/registration.svg';
import FormIcon from '@icons/form.svg';
import AssessmentIcon from '@icons/assessment.svg';
import AgreementIcon from '@icons/agreement.svg';
import ManagerIcon from '@icons/manager.svg';
import LoginIcon from '@icons/login.svg';
import styles from './page.module.css';

const Page: FC = () => {
  return (
    <Article
      breadсrumbs={[
        { name: 'Помощь', path: '/help' },
        { name: 'Условия сотрудничества для оптовых покупателей', path: '/conditions' }
      ]}
      title='Условия сотрудничества для оптовых покупателей'
      content={
        <>
          <div className={styles.text}>
            Уважаемые будущие партнеры. Если у вас розничный или оптовый магазин спортивного направления, спортивная
            школа, команда или медиа ресурс, мы будем рады сотрудничеству с Вами.
            <br />
            <br />
            Предлагаем долгосрочные и взаимовыгодные отношения.
            <br />
            <br />
            Чтобы начать совместную работу, напишите письмо в свободной форме, о своем проекте и пришлите его по адресу{' '}
            <a href='zakaz@bivium.ru'>zakaz@bivium.ru</a>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <RegistrationIcon />
              Необходимо пройти Регистрацию
            </div>
            <div className={styles.item}>
              <FormIcon />
              <span>
                Заполнить Анкету и выслать её по адресу <a href='zakaz@bivium.ru'>zakaz@bivium.ru</a>
              </span>
            </div>
            <div className={styles.item}>
              <AssessmentIcon />
              Ваша информация пройдет оценку
            </div>
            <div className={styles.item}>
              <ManagerIcon />С вами свяжется менеджер по продажам и вы обсудите условия
            </div>
            <div className={styles.item}>
              <AgreementIcon />
              Заключить договор
            </div>
            <div className={styles.item}>
              <LoginIcon />
              Вам будет выслан Логин и Пароль для Авторизации и дальнейшей успешной работы
            </div>
          </div>
          <div className={styles.buttons}>
            <ConditionsPopupButton
              buttonText='Отправить заявку'
              formTitle='Заказать звонок'
              submitButtonText='Отправить'
              cancelButtonText='Отменить'
              icon={false}
              apiEndpoint='feedback/callback/'
            />

            <Button className={styles.button} variant='default' icon={false}>
              Скачать каталог новой коллекции
            </Button>
          </div>
        </>
      }
    />
  );
};

export default Page;
