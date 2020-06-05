const styles = require('./ShopItemContainer.module.scss');

interface Props {
  name: string;
  quantity: number;
  type: string;
  speeduptime?: number;
}

const ShopItemContainer = ({name, quantity, type, speeduptime}: Props) => {
  return (
    <div className={styles.container}>
      <p>{name}</p>
      <p>{type}</p>
      <p>{quantity}</p>
      <p>{speeduptime ? speeduptime : null}</p>
    </div>
  );
};

export default ShopItemContainer;
