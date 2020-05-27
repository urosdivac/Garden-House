import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import styles from './index.module.scss';
import Navbar from '../components/Layout/Navbar';
import FirstBlock from '../components/Homepage/firstBlock';
import SecondBlock from '../components/Homepage/secondBlock';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks if user is logged in
  useEffect(() => {
    const cookie = Cookies.get('JWT');
    if (cookie) setIsLoggedIn(true);
  }, []);

  return (
    <div>
      <div className={styles.container}>
        {isLoggedIn ? null : <Navbar />}

        <div className={styles.innerContainer}>
          <img src="/assets/Logo.svg" className={styles.logo} alt="logo" />

          <p className={styles.slogan}>Platform for managing nurseries</p>

          <Link href="/register">
            <a className={styles.register}>Get started</a>
          </Link>
        </div>
      </div>
      <FirstBlock />
      <SecondBlock />

      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Lato', sans-serif;
          }
        `}
      </style>

      <Head>
        <title>Garden House</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
    </div>
  );
}
