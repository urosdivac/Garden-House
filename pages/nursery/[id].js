import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import styles from '../dashboard.module.scss';
import Panel from '../../components/Dashboard/Panel';
import Nursery from '../../components/Dashboard/Nursery/Nursery-Manager';


const dashboard = () => {
  const [token, setToken] = useState();
  const [dataState, setDataState] = useState();
  const router = useRouter();

  const getNurseryData = async () => {
    const id = router.query.id;
    const res = await axios.post('https://gardenhouse.tech/seedling/nursery/', {
      id,
    });
    const data = res.data.data;

    setDataState(data);
  };
  useEffect(() => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
    });
    getNurseryData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <Panel
          admin={false}
          isFarmer={token ? !token.isAdmin : false}
          isCompany={token ? token.shortname : false}
          isAdmin={token ? token.isadmin : false}
          nursery={true}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Nursery data={dataState} id={router.query.id} />
      </div>
      <Head>
        <title>Nursery - Garden House</title>
      </Head>
    </div>
  );
};

export default dashboard;
