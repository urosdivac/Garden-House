import {useEffect, useState} from 'react';
import Head from 'next/head';
import Panel from '../components/Dashboard/Panel';
import Admin from '../components/Dashboard/Admin/Admin-Dashboard';
const styles = require('./dashboard.module.scss');
import getToken from '../src/getToken';

const dashboard = () => {
  interface Token {
    isadmin: boolean;
  }

  const [token, setToken] = useState<Token>();

  useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <Panel
          admin={token ? token.isadmin : false}
          isAdmin={token ? token.isadmin : false}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Admin />
      </div>
      <Head>
        <title>Admin Dashboard - Garden House</title>
      </Head>
    </div>
  );
};

export default dashboard;
