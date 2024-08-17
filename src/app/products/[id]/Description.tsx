import { FC } from 'react';
import styles from './Description.module.css';

interface Props {
  text: string;
}

const Description: FC<Props> = ({ text }) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Описание</h2>
      <div className={styles.text}>{text}</div>
    </section>
  );
};

export default Description;
