import styles from './Nursery-Container.module.scss';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import AllInboxIcon from '@material-ui/icons/AllInbox';

const NurseryContainer = props => {
  return (
    <div className={styles.container}>
      <p id={styles.name}>{props.name}</p>
      <div className={styles.iconContainer}>
        <InvertColorsIcon className={styles.water} />
        <p>Water levels : {props.water} L</p>
      </div>
      <div className={styles.iconContainer}>
        <WbSunnyIcon className={styles.sun} />
        <p>Temeprature : {props.temeprature} °C</p>
      </div>

      <div className={styles.iconContainer}>
        <AllInboxIcon className={styles.space} />
        <p>Available Space : {props.space}</p>
      </div>
    </div>
  );
};

export default NurseryContainer;
