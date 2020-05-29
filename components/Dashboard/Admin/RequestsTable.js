import styles from './RequestsTable.module.scss';
const RequestsTable = props => {
  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <div className={styles.fieldContainer}>
          <div className={styles.all}>
            <p>All</p>
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.pending}>
            <p>Pending</p>
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.accepted}>
            <p>Accepted</p>
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.declined}>
            <p>Declined</p>
          </div>
        </div>
      </div>
      <div className={styles.dataFields}>
          
      </div>
    </div>
  );
};

export default RequestsTable;
