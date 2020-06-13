const styles = require('./RequestsTable.module.scss');

interface Props {
  changeStatusFilter: (filter: string) => void;
  statusfilter: string;
}

const RequestsTable = ({changeStatusFilter, statusfilter}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <div
          className={styles.fieldContainer}
          onClick={() => {
            changeStatusFilter('all');
          }}
        >
          <div
            className={statusfilter === 'all' ? styles.allActive : styles.all}
          >
            <p>All</p>
          </div>
        </div>
        <div
          className={styles.fieldContainer}
          onClick={() => {
            changeStatusFilter('pending');
          }}
        >
          <div
            className={
              statusfilter === 'pending' ? styles.pendingActive : styles.pending
            }
          >
            <p>Pending</p>
          </div>
        </div>
        <div
          className={styles.fieldContainer}
          onClick={() => {
            changeStatusFilter('accepted');
          }}
        >
          <div
            className={
              statusfilter === 'accepted'
                ? styles.acceptedActive
                : styles.accepted
            }
          >
            <p>Accepted</p>
          </div>
        </div>
        <div
          className={styles.fieldContainer}
          onClick={() => {
            changeStatusFilter('declined');
          }}
        >
          <div
            className={
              statusfilter === 'declined'
                ? styles.declinedActive
                : styles.declined
            }
          >
            <p>Declined</p>
          </div>
        </div>
      </div>
      <div className={styles.dataFields}>
        <div className={styles.dataField}>
          <p>First Name</p>
        </div>
        <div className={styles.dataField}>
          <p>Last Name</p>
        </div>
        <div className={styles.dataField}>
          <p>Username</p>
        </div>
        <div className={styles.dataField}>
          <p>Registered at</p>
        </div>
        <div className={styles.dataField}>
          <p>Birthday</p>
        </div>

        <div className={styles.dataField}>
          <p>E-mail</p>
        </div>
        <div className={styles.dataField}>
          <p>Status</p>
        </div>
      </div>
    </div>
  );
};

export default RequestsTable;
