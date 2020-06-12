import React from 'react';
import Header from './Header';
const styles = require('./ShopItem.module.scss');

const ShopItems = () => {
  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
};

export default ShopItems;
