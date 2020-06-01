import React from 'react';
import styles from './Nursery-Container.module.scss';
const NurseryContainer = props => {
  return (
    <div className={styles.container}>
      <p>{props.name}</p>
    </div>
  );
};

export default NurseryContainer;
