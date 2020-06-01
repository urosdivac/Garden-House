import styles from './Nursery-Dashboard.module.scss';
import axios from 'axios';
import AddNursery from './Add-Nursery';
const Nursery = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <p>Nursery managment</p>
      </div>
      <AddNursery />
    </div>
  );
};

export default Nursery;
