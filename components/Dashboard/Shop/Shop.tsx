import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
import ShopItemContainer from './ShopItemContainer';
const styles = require('./Shop.module.scss');

const Shop = () => {
  const [data, setData] = useState();

  const getStoreItems = async () => {
    const data = await axios.post('https://gardenhouse.tech/shopitem/');
    console.log(data.data.data);
  };

  useEffect(() => {
    getStoreItems();
  }, []);
  return (
    <div className={styles.container}>
      <Header />
      <h1>Content</h1>
      <ShopItemContainer />
    </div>
  );
};

export default Shop;
