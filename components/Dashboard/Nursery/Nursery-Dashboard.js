import {useEffect, useState} from 'react';
import styles from './Nursery-Dashboard.module.scss';
import axios from 'axios';
import AddNursery from './Add-Nursery';
import NurseryContainer from './Nursery-Container';
const Nursery = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await axios.post('https://gardenhouse.tech/nursery/', {
      email: 'danilo@gmail.com',
    });

    setData(data.data.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <p>Nursery managment</p>
      </div>
      {data.length > 2 ? <AddNursery type={0} /> : null}
      <div className={styles.nurseryContainersContainer}>
        {data.length > 2 ? (
          data.map(nursery => {
            return (
              <NurseryContainer
                name={nursery.name}
                temeprature={nursery.temeprature}
                water={nursery.waterlevel}
              />
            );
          })
        ) : (
          <div className={styles.messageContainer}>
            <p className={styles.message}>You currently have no nurseries.</p>
            <AddNursery type={1} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nursery;
