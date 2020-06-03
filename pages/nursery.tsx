import {useEffect, useState} from 'react';
import Head from 'next/head';
const styles = require('./dashboard.module.scss');
import Panel from '../components/Dashboard/Panel';
import Nursery from '../components/Dashboard/Nursery/Nursery-Dashboard';
import getToken from '../src/getToken';

const dashboard = () => {
  interface Token {
    isadmin: boolean;
    shortname: string;
  }
  
  const [token, setToken] = useState<Token | undefined>();

  useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <Panel
          admin={false}
          isFarmer={token ? !token.isadmin : false}
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
