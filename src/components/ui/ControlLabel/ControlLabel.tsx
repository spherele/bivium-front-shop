import { FC, ComponentProps } from 'react';
import classNames from 'classnames';
import styles from './ControlLabel.module.css';

interface Props extends ComponentProps<'label'> {
  title: string;
}

const ControlLabel: FC<Props> = ({ title, children, className, ...props }) => {
  return (
    <label className={classNames(className, styles.controlLabel)} {...props}>
      <div className={styles.controlLabelTitle}>{title}</div>
      {children}
    </label>
  );
};

export default ControlLabel;
