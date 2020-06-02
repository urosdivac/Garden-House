import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import styles from './Nursery-Dashboard.module.scss';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const Nursery = props => {
  const [nurseryData, setNurseryData] = useState();
  const [maximumSpace, setMaximumSpace] = useState();
  const [token, setToken] = useState();
  const [nurserySucces, setNurserySuccess] = useState(false);

  const getTokenInfo = async () => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
    });
  };

  const getMaximumSpace = () => {
    if (nurseryData) {
      setMaximumSpace(nurseryData.length * 1 * nurseryData.width * 1);
    }
  };

  const getNurseryData = () => {
    axios
      .post('https://gardenhouse.tech/nursery/id', {
        id: props.id,
      })
      .then(data => {
        setNurseryData(data.data.data.rows[0]);
      });
  };

  useEffect(() => {
    if (!token) getTokenInfo();
    if (!nurseryData) getNurseryData();
    getMaximumSpace();
  }, [token, nurseryData]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.managerContainer}>
          {nurseryData ? <p>{nurseryData.name}</p> : null}
        </div>
        <div className={styles.statsManagerContainer}>
          {nurseryData ? (
            <div className={styles.innerStatsManagerContainer}>
              <div className={styles.availableSpaceContainer}>
                <p>Available Space</p>
                <div>
                  <AllInboxIcon className={styles.space} />
                  <p>
                    {nurseryData.available_space} / {maximumSpace}
                  </p>
                </div>
              </div>
              <div className={styles.availableSpaceContainer}>
                <p>Temeprature</p>
                <div>
                  <WbSunnyIcon className={styles.sun} />
                  <p>{nurseryData.temeprature}°C</p>
                </div>
              </div>
              <div className={styles.availableSpaceContainer}>
                <p>Water Levels</p>
                <div>
                  <InvertColorsIcon className={styles.water} />
                  <p>{nurseryData.waterlevel} Liters</p>
                </div>
              </div>
            </div>
          ) : null}
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
