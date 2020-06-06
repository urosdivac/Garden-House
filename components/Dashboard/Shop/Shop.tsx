import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
import ShopItemContainer from './ShopItemContainer';
const styles = require('./Shop.module.scss');

const Shop = () => {
  const [data, setData] = useState([]);

  const getStoreItems = async () => {
    const data = await axios.post('https://gardenhouse.tech/shopitem/', {});
    console.log(data);
    setData(data.data.data);
  };

  useEffect(() => {
    getStoreItems();
  }, []);
  return (
    <div className={styles.container}>
      <Header />
      {data.map((item, key) => {
        return (
          <ShopItemContainer
            name={item.name}
            quantity={item.quantity}
            speeduptime={item.speeduptime ? item.speeduptime : null}
            type={item.speeduptime ? 'Fertilizer' : 'Seedling'}
            key={item.id}
            id={item.id}
          />
        );
      })}
    </div>
  );
};

export default Shop;
