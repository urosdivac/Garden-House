import {useEffect} from 'react';
import axios from 'axios';
import Filters from './Filters';

const styles = require('./WarehouseData.module.scss');

const WarehouseData = () => {
  return (
    <div className={styles.container}>
      <Filters />
    </div>
  );
};

export default WarehouseData;
