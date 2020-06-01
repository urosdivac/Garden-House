import {useEffect, useState} from 'react';
import Head from 'next/head';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import styles from './dashboard.module.scss';
import Panel from '../components/Dashboard/Panel';
import Nursery from '../components/Dashboard/Nursery/Nursery-Dashboard';

const dashboard = ({data}) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
    });
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
        <Nursery />
      </div>
      <Head>
        <title>Nursery - Garden House</title>
      </Head>
    </div>
  );
};

export default dashboard;
