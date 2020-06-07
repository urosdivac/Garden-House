import React from 'react';
import Heading from './Heading';
const styles = require('./Order.module.scss');

const Order = () => {
  return (
    <div className={styles.container}>
      <Heading />
    </div>
  );
};

export default Order;
