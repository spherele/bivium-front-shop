import { FC } from 'react';
import classNames from 'classnames';
import styles from './page.module.css';
import Form from './Form';

const Page: FC = () => {
  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <Form />
    </main>
  );
};

export default Page;
