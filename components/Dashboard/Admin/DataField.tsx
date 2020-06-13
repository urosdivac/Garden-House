import {useState} from 'react';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import axios from 'axios';
const styles = require('./DataField.module.scss');

interface Props {
  isaccepted: string;
  id: number;
  firstname: string;
  lastname: string;
  createdat: string;
  phonenumber: string;
  birthday: string;
  email: string;
  username: string;
  getdata: () => void;
  updatestats: (value: number) => void;
}

const DataField = ({
  isaccepted,
  id,
  getdata,
  updatestats,
  firstname,
  lastname,
  createdat,
  birthday,
  email,
  username,
}: Props) => {
  const [status, setStatus] = useState(isaccepted);

  const acceptUser = async () => {
    await axios.post('https://gardenhouse.tech/admin/accept', {id: id});
    setStatus('accepted');
    getdata();
    updatestats(1);
  };

  const declineUser = async () => {
    await axios.post('https://gardenhouse.tech/admin/decline', {id: id});
    setStatus('declined');
    getdata();
    updatestats(2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p>{firstname}</p>
      </div>
      <div className={styles.field}>
        <p>{lastname}</p>
      </div>
      <div className={styles.field}>
        <p>{username}</p>
      </div>
      <div className={styles.field}>
        <p>{createdat}</p>
      </div>
      <div className={styles.field}>
        <p>{birthday}</p>
      </div>
      <div className={styles.field}>
        <p>{email}</p>
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
