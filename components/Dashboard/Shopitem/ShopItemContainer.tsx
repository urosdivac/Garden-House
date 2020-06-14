import {useState} from 'react';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import EcoIcon from '@material-ui/icons/Eco';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios';
const styles = require('./ShopItemContainer.module.scss');

interface Props {
  id: number;
  name: string;
  type: string;
  quantity: number;
  filteritems: (id: number) => void;
}

const ShopItemContainer = ({id, name, type, quantity, filteritems}: Props) => {
  const [confirm, setConfirm] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const deleteItem = async () => {
    filteritems(id);
    await axios.post('https://gardenhouse.tech/shopitem/delete', {id});
  };

  return (
    <div className={styles.container}>
      <div className={styles.fieldContainer}>
        <p>{name}</p>
      </div>
      {type === 'fertilizer' ? (
        <div className={styles.fieldContainer}>
          <FlashOnIcon className={styles.fertilizerIcon} />
          <p>{capitalizeFirstLetter(type)}</p>
        </div>
      ) : (
        <div className={styles.fieldContainer}>
          <EcoIcon className={styles.seedlingIcon} />
          <p>{capitalizeFirstLetter(type)}</p>
        </div>
      )}

      <div className={styles.fieldContainer}>
        <p>{quantity}</p>
      </div>
      {confirm ? (
        <div className={styles.confirmContainer}>
          <div>
            <p onClick={deleteItem}>Confirm</p>
            <p onClick={() => setConfirm(false)}>Cancel</p>
          </div>
        </div>
      ) : (
        <div>
          <HighlightOffIcon
            className={styles.removeIcon}
            onClick={() => setConfirm(true)}
          />
        </div>
      )}
    </div>
  );
};

export default ShopItemContainer;
