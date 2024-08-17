import { FC } from 'react';
import classNames from 'classnames';

import ExpandableText from '@/components/ui/ExpandableText/ExpandableText';

import styles from './Description.module.css';

interface Props {
  title: string;
  text: string;
}

const Description: FC<Props> = ({ title, text }) => {
  return (
    <section className={classNames(styles.wrapper, 'container')}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.text}>
        <ExpandableText>{text}</ExpandableText>
      </div>
    </section>
  );
};

export default Description;
