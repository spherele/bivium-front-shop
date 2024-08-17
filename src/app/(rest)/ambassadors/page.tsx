import { FC } from 'react';

import Article from '@/components/Article/Article';
import Button from '@/components/ui/Button/Button';

import styles from './page.module.css';

const Page: FC = () => {
  return (
    <Article
      breadсrumbs={[
        { name: 'Помощь', path: '/help' },
        { name: 'Стать амбасадором или представителем бренда', path: '/ambassadors' }
      ]}
      title='Собираем команду BIVIUM'
      content={
        <>
          <div className={styles.text}>
            Вы яркий и харизматичный спортсмен. У вас много наград, а может быть большая аудитория людей, которым
            нравится наблюдать за вашими успехами. Вам близко, то что мы делаем. Пишите нам, и станьте частью команды
            амбассадоров, которую мы сейчас создаем.
            <br />
            <br />
            Будет много интересных проектов, много крутых стартов, наград и призов!
            <br />
            <br />
            Расскажи о себе по адресу - <a href='mailto:ambassador@bivium.ru'>ambassador@bivium.ru</a>
          </div>
          <Button className={styles.button} variant='negative' icon={false} type='button'>
            <a href='mailto:ambassador@bivium.ru'>Отправить заявку</a>
          </Button>
          <img className={styles.image} src='/images/logo-article.png' alt='' />
        </>
      }
    />
  );
};

export default Page;
