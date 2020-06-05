const styles = require('./Filters.module.scss');

interface Props {
  setfilter: (filter) => void;
}

const Filters = ({setfilter}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.all} onClick={() => setfilter('all')}>
        <p>All</p>
      </div>

      <div className={styles.seedlings} onClick={() => setfilter('seedling')}>
        <p>Seedlings</p>
      </div>

      <div
        className={styles.fertilizers}
        onClick={() => setfilter('fertilizer')}
      >
        <p>Fertilizers</p>
      </div>
    </div>
  );
};

export default Filters;
