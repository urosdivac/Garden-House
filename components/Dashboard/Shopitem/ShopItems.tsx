import {useEffect, useState} from 'react';
import Header from './Header';
import axios from 'axios';
import getToken from '../../../src/getToken';
import ShopItemContainer from './ShopItemContainer';
const styles = require('./ShopItems.module.scss');

interface Token {
  id: number;
}

const ShopItems = () => {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState<Token>();

  const getItems = async () => {
    const data = await axios.post(
      `https://gardenhouse.tech/shopitem/?id=${token.id}`,
    );
    setItems(data.data.data);
  };

  useEffect(() => {
    if (!token) setToken(getToken());
    if (token) getItems();
  }, [token]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.innerContainer}>
        <div className={styles.labels}>
          <div className={styles.labelContainer}>
            <p>Name</p>
          </div>
          <div className={styles.labelContainer}>
            <p>Type</p>
          </div>
          <div className={styles.labelContainer}>
            <p>Quantity</p>
          </div>
        </div>
        <div className={styles.itemListContainer}>
          {items.length > 0
            ? items.map(item => {
                return (
                  <ShopItemContainer
                    name={item.name}
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    quantity={item.quantity}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShopItems;
