import {useEffect, useState} from 'react';
import Head from 'next/head';
import Panel from '../components/Dashboard/Panel';
import Warehouse from '../components/Dashboard/Warehouse/Warehouse';
const styles = require('./dashboard.module.scss');
import getToken from '../src/getToken';

const ShopItem = () => {
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
          shopitem={true}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Warehouse />
      </div>
      <Head>
        <title>Shop Items - Garden House</title>
      </Head>
    </div>
  );
};

export default ShopItem;
