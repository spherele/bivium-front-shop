import { FC } from 'react';
import classNames from 'classnames';
import styles from './InformationText.module.css';

import InfoIcon from '@icons/info.svg';

interface Props {
  text: string;
  className?: string;
}

const InformationText: FC<Props> = ({ className, text }) => {
  return (
    <div className={classNames(className, styles.wrapper)}>
      <InfoIcon />
      {text}
    </div>
  );
};

export default InformationText;
