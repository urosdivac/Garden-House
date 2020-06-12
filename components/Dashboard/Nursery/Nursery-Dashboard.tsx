import {useEffect, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import NurseryContainer from './Nursery-Container';
import Modal from './Modal';
import getToken from '../../../src/getToken';
const styles = require('./Nursery-Dashboard.module.scss');

const Nursery = () => {
  interface Token {
    email: string;
    firstname: string;
    lastname: string;
    isadmin: boolean;
    shortname: string;
  }

  const [data, setData] = useState([]);
  const [token, setToken] = useState<Token | undefined>();
  const [nurserySucces, setNurserySuccess] = useState(false);

  const getData = async () => {
    if (token) {
      const data = await axios.post('https://gardenhouse.tech/nursery/', {
        email: token.email,
      });
      setData(data.data.data);
    }
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
    if (!token) setToken(getToken());
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
                  id={nursery.id}
                />
              );
            })
          ) : (
            <div className={styles.messageContainer}>
              <p className={styles.message}>You currently have no nurseries.</p>
              <Modal type={1} addNursery={addNursery} />
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
