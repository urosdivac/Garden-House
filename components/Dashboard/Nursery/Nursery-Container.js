import React from 'react';
import styles from './Nursery-Container.module.scss';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
const NurseryContainer = props => {
  return (
    <div className={styles.container}>
      <p>{props.name}</p>
      <div className={styles.iconContainer}>
        <InvertColorsIcon className={styles.water} />
        <p>Water levels : {props.water} L</p>
      </div>
      <div className={styles.iconContainer}>
        <WbSunnyIcon className={styles.sun} />
        <p>Temeprature : {props.temeprature} °C</p>
      </div>
    </div>
  );
};

export default NurseryContainer;
