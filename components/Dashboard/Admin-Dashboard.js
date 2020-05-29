import {useState, useEffect} from 'react';
import styles from './Admin.module.scss';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
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
      <div className={styles.headingWrapper}>
        <p className={styles.heading}>Admin dashboard</p>
      </div>
    </div>
  );
};

export default Admin;
