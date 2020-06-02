import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import styles from './Nursery-Dashboard.module.scss';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import NurseryContainer from './Nursery-Container';
import Modal from './Modal';
const Nursery = props => {
  const [nurseryData, setNurseryData] = useState();
  const [token, setToken] = useState();
  const [nurserySucces, setNurserySuccess] = useState(false);

  const getTokenInfo = async () => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
    });
  };

  const getNurseryData = async () => {
    const data = await axios.post('https://gardenhouse.tech/nursery/id', {
      id: props.id,
    });
    setNurseryData(data.data.data.rows[0]);
  };

  useEffect(() => {
    if (!token) getTokenInfo();
    getNurseryData();
  }, [token]);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.managerContainer}>
          {nurseryData ? <p>{nurseryData.name}</p> : null}
        </div>
        <div className={styles.nurseryContainersContainer}>
          <button onClick={() => console.log(nurseryData)}>Click me</button>
        </div>
      </div>

      <div className={styles.alertContainer}>
        {nurserySucces ? (
          <Alert
            onClose={() => {
              setNurserySuccess(false);
            }}
            className={styles.alert}
          >
            Nursery successfuly created!
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default Nursery;
