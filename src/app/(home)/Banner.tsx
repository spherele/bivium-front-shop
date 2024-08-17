import { FC } from 'react';
import classNames from 'classnames';

import { formatUrl } from '@/utils/formatUrl';

import styles from './Banner.module.css';

interface Props {
  picture: string;
  mobilePicture: string | null;
  title: string;
  subtitle: string;
  className?: string;
}

const Banner: FC<Props> = ({ picture, mobilePicture, title, subtitle, className }) => {
  return (
    <section
      className={classNames(styles.wrapper, className)}
      style={{
        '--picture': `url(${formatUrl(picture)})`,
        '--mobile-picture': `url(${formatUrl(mobilePicture ? mobilePicture : picture)})`
      }}
    >
      <div className={classNames(styles.container, 'container')}>
        <div className={styles.subtitle}>{subtitle}</div>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </section>
  );
};

export default Banner;
