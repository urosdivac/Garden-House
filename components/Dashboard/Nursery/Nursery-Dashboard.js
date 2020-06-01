import {useEffect, useState} from 'react';
import styles from './Nursery-Dashboard.module.scss';
import axios from 'axios';
import AddNursery from './Add-Nursery';
import NurseryContainer from './Nursery-Container';
import Modal from './Modal'
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
    console.log('test');
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <p>Nursery managment</p>
        <div className={styles.addContainer}>
          {data.length > 0 ? <Modal type={0} /> : null}
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
  );
};

export default Nursery;
