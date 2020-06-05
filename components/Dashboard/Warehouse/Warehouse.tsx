const styles = require('./Warehouse.module.scss');
import Heading from './Heading';
import WarehouseData from './WarehouseData';

const Warehouse = () => {
  return (
    <div className={styles.container}>
      <Heading />
      
      <WarehouseData />
    </div>
  );
};

export default Warehouse;
