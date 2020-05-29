import {useState, useEffect} from 'react';
import styles from './Admin.module.scss';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import WelcomeHeader from './WelcomeHeader';
import RequestsTable from './RequestsTable';

import axios from 'axios';

const Admin = () => {
  const [token, setToken] = useState();

  const getTokenInfo = async () => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
      console.log(decoded);
    });
  };
  useEffect(() => {
    getTokenInfo();
  }, []);
  return (
    <div className={styles.container}>
      <WelcomeHeader name={token ? token.firstname : null} requestsNumber={2} />
      <RequestsTable />
    </div>
  );
};

export default Admin;
