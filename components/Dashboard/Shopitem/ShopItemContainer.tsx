const styles = require('./ShopItemContainer.module.scss');

interface Props {
  id: number;
  name: string;
  type: string;
  quantity: number;
}

const ShopItemContainer = ({id, name, type, quantity}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.fieldContainer}>
        <p>{name}</p>
      </div>
      <div className={styles.fieldContainer}>
        <p>{type}</p>
      </div>
      <div className={styles.fieldContainer}>
        <p>{quantity}</p>
      </div>
    </div>
  );
};

export default ShopItemContainer;
