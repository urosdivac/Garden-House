import {useEffect, useState} from 'react';
import Head from 'next/head';
import Panel from '../components/Dashboard/Panel';
import Order from '../components/Dashboard/Order/Order';
import getToken from '../src/getToken';
const styles = require('./dashboard.module.scss');

const orders = () => {
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
          orders={true}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Order />
      </div>
      <Head>
        <title>Shop - Garden House</title>
      </Head>
    </div>
  );
};

export default orders;
