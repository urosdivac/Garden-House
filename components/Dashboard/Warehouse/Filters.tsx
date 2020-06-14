const styles = require('./Filters.module.scss');

interface Props {
  setfilter: (filter) => void;
  filter: string;
}

const Filters = ({setfilter, filter}: Props) => {
  return (
    <div className={styles.container}>
      <div
        className={filter === 'all' ? styles.allActive : styles.all}
        onClick={() => setfilter('all')}
      >
        <p>All</p>
      </div>

      <div
        className={
          filter === 'seedling' ? styles.seedlingsActive : styles.seedlings
        }
        onClick={() => setfilter('seedling')}
      >
        <p>Seedlings</p>
      </div>

      <div
        className={
          filter === 'fertilizer'
            ? styles.fertilizersActive
            : styles.fertilizers
        }
        onClick={() => setfilter('fertilizer')}
      >
        <p>Fertilizers</p>
      </div>
    </div>
  );
};

export default Filters;
