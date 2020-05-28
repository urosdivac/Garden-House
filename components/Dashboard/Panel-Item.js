import React from 'react';
import styles from './Panel-Item.module.scss';


const Panel = props => {
  return (
    <div>
      {props.isActive ? (
        <div className={styles.containerActive}>
          <span className={styles.iconWrapperActive}>{props.icon}</span>
          <span className={styles.textWrapperActive}>
            <p className={styles.textActive}>{props.text}</p>
          </span>
        </div>
      ) : (
        <div className={styles.container}>
          <span className={styles.iconWrapper}>{props.icon}</span>
          <span className={styles.textWrapper}>
            <p className={styles.text}>{props.text}</p>
          </span>
        </div>
      )}
    </div>
  );
};

export default Panel;
