import {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './register.module.scss';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';

const register = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <img src="/assets/Logo.svg" className={styles.logo} alt="logo" />
      </Link>

      <div className={styles.choiceWrapper}>
        <Link href="/register-farmer">
          <div className={styles.iconWrapper}>
            <PersonIcon className={styles.icon} />
            <p>Register as farmer</p>
          </div>
        </Link>

        <Link href="/buisness">
          <div className={styles.iconWrapper}>
            <StoreIcon className={styles.icon} />
            <p>Register as buisness</p>
          </div>
        </Link>
      </div>
      <Head>
        <title>Register - Garden House</title>
        <meta
          name="Description"
          content="Choose between two types of registration, either as a farmer or a buisness. "
        ></meta>
      </Head>
    </div>
  );
};

export default register;
