import React from 'react';
import NewItem from './NewItem';
const styles = require('./Header.module.scss');

const Header = () => {
  return (
    <div className={styles.container}>
      <p>Store items</p>
      <NewItem />
    </div>
  );
};

export default Header;
