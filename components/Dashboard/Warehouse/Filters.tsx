const styles = require('./Filters.module.scss');

const Filters = () => {
  return (
    <div className={styles.container}>
      <div className={styles.all}>
        <p>All</p>
      </div>

      <div className={styles.seedlings}>
        <p>Seedlings</p>
      </div>

      <div className={styles.fertilizers}>
        <p>Fertilizers</p>
      </div>
    </div>
  );
};

export default Filters;
