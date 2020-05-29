import {useState} from 'react';
import styles from './DataField.module.scss';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import axios from 'axios';

const DataField = props => {
  const [status, setStatus] = useState(props.isaccepted);

  const acceptUser = async () => {
    await axios.post('https://gardenhouse.tech/admin/accept', {id: props.id});
    setStatus('accepted');
    props.getdata();
  };

  const declineUser = async () => {
    await axios.post('https://gardenhouse.tech/admin/decline', {id: props.id});
    setStatus('declined');
    props.getdata();
  };

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p>{props.id}</p>
      </div>
      <div className={styles.field}>
        <p>{props.firstname}</p>
      </div>
      <div className={styles.field}>
        <p>{props.lastname}</p>
      </div>
      <div className={styles.field}>
        <p>{props.username}</p>
      </div>
      <div className={styles.field}>
        <p>{props.createdat}</p>
      </div>
      <div className={styles.field}>
        <p>{props.birthday}</p>
      </div>
      <div className={styles.field}>
        <p>{props.phonenumber}</p>
      </div>
      <div className={styles.field}>
        <p>{props.email}</p>
      </div>
      <div className={styles.field}>
        {status === 'pending' ? (
          <div className={styles.functionWrapper}>
            <CheckIcon className={styles.accept} onClick={acceptUser} />
            <BlockIcon className={styles.decline} onClick={declineUser} />
          </div>
        ) : null}

        {status === 'accepted' ? (
          <p className={styles.accepted}>Accepted</p>
        ) : null}

        {status === 'declined' ? (
          <p className={styles.declined}>Declined</p>
        ) : null}
      </div>
    </div>
  );
};

export default DataField;
