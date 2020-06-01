import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import styles from './Nursery-Dashboard.module.scss';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import NurseryContainer from './Nursery-Container';
import Modal from './Modal';
const Nursery = () => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState();
  const [nurserySucces, setNurserySuccess] = useState(false);

  const getData = async () => {
    if (token) {
      const data = await axios.post('https://gardenhouse.tech/nursery/', {
        email: token.email,
      });
      setData(data.data.data);
    }
  };

  const getTokenInfo = async () => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
    });
  };

  const addNursery = async (name, address, length, width) => {
    await axios.post('https://gardenhouse.tech/nursery/add', {
      name,
      address,
      length,
      width,
      owneremail: token.email,
    });
    getData();
    setNurserySuccess(true);
  };

  useEffect(() => {
    if (!token) getTokenInfo();
    getData();
  }, [token]);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <p>Nursery managment</p>
          <div className={styles.addContainer}>
            {data.length > 0 ? (
              <Modal type={0} addNursery={addNursery} />
            ) : null}
          </div>
        </div>
        <div className={styles.nurseryContainersContainer}>
          {data.length > 0 ? (
            data.map(nursery => {
              return (
                <NurseryContainer
                  name={nursery.name}
                  temeprature={nursery.temeprature}
                  water={nursery.waterlevel}
                  space={nursery.available_space}
                  key={nursery.id}
                />
              );
            })
          ) : (
            <div className={styles.messageContainer}>
              <p className={styles.message}>You currently have no nurseries.</p>
              <Modal type={1} />
            </div>
          )}
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
