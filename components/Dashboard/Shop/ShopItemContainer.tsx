import {useState} from 'react';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
const styles = require('./ShopItemContainer.module.scss');

interface Props {
  id: number;
  name: string;
  quantity: number;
  type: string;
  speeduptime?: number;
}

const ShopItemContainer = ({name, quantity, type, speeduptime}: Props) => {
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(1);

  return (
    <div className={styles.container}>
      <p>Name : {name}</p>
      <p>Type : {type}</p>
      <p>Quantity : {quantity}</p>
      <p>{speeduptime ? `Speedup Time : ${speeduptime}` : null}</p>
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
      <Button className={styles.button} size="large">
        Add to Cart
      </Button>
    </div>
  );
};

export default ShopItemContainer;
