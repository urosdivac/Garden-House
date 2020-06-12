import {useState} from 'react';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import StorageIcon from '@material-ui/icons/Storage';
const styles = require('./ShopItemContainer.module.scss');

interface Props {
  id: number;
  name: string;
  quant: number;
  type: string;
  speeduptime?: number;
  addtocart: (id: number, quantity: number, name: string) => void;
  handlealert: (text: string) => void;
}

const ShopItemContainer = ({
  id,
  name,
  quant,
  type,
  speeduptime,
  addtocart,
  handlealert,
}: Props) => {
  const [qty, setQty] = useState(1);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className={styles.container}>
      <p>{name}</p>
      <hr className={styles.hr}></hr>
      <span className={styles.iconWrapper}>
        {type === 'fertilizer' ? (
          <BatteryChargingFullIcon className={styles.fertilizerIcon} />
        ) : (
          <LocalFloristIcon className={styles.seedlingIcon} />
        )}
        <p> {capitalizeFirstLetter(type)}</p>
      </span>
      <span className={styles.iconWrapper}>
        <StorageIcon className={styles.storageIcon} />
        <p> {quant} quantity</p>
      </span>
      <div className={styles.speedupTime}>
        <p>{speeduptime ? `Speedup Time : ${speeduptime} days` : null}</p>
      </div>
      <div className={styles.quantityContainer}>
        <RemoveIcon
          className={styles.decrease}
          onClick={() => {
            if (qty > 1) setQty(qty - 1);
          }}
        />
        {qty}
        <AddIcon className={styles.increase} onClick={() => setQty(qty + 1)} />
      </div>
      <Button
        className={styles.button}
        size="large"
        onClick={() => {
          addtocart(id, qty, name);
          handlealert(name);
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ShopItemContainer;
