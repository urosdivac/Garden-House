import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import Link from 'next/link';
const styles = require('./Nursery-Container.module.scss');

interface Props {
  id: number;
  name: string;
  water: number;
  temeprature: number;
  space: number;
}

const NurseryContainer = ({id, name, water, temeprature, space}: Props) => {
  return (
    <Link href={`/nursery/${id}`}>
      <div className={styles.container}>
        <p id={styles.name}>{name}</p>
        <div className={styles.iconContainer}>
          <InvertColorsIcon className={styles.water} />
          <p>Water levels : {water} L</p>
        </div>
        <div className={styles.iconContainer}>
          <WbSunnyIcon className={styles.sun} />
          <p>Temeprature : {temeprature} °C</p>
        </div>

        <div className={styles.iconContainer}>
          <AllInboxIcon className={styles.space} />
          <p>Available Space : {space}</p>
        </div>
      </div>
    </Link>
  );
};

export default NurseryContainer;
