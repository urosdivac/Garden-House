import {useEffect, useState} from 'react';
import Head from 'next/head';
import Panel from '../components/Dashboard/Panel';
import Shop from '../components/Dashboard/Shop/Shop';
import getToken from '../src/getToken';
const styles = require('./dashboard.module.scss');

const warehouse = () => {
  interface Token {
    isadmin: boolean;
    shortname: string;
  }

  const [token, setToken] = useState<Token>();

  useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <Panel
          isFarmer={token ? !token.isadmin : false}
          isCompany={token ? token.shortname : false}
          isAdmin={token ? token.isadmin : false}
          shop={true}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Shop />
      </div>
      <Head>
        <title>Shop - Garden House</title>
      </Head>
    </div>
  );
};

export default warehouse;
