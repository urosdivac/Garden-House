import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Layout/Navbar';
const FirstBlock = dynamic(import('../components/Homepage/firstBlock'));
const SecondBlock = dynamic(import('../components/Homepage/secondBlock'));
const styles = require('./index.module.scss');

export default function Home() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 800) setIsMobile(false);
  });

  return (
    <div>
      <div className={styles.container}>
        {isMobile ? null : <Navbar />}

        <div className={styles.innerContainer}>
          <img src="/assets/Logo.svg" className={styles.logo} alt="logo" />

          <p className={styles.slogan}>Platform for managing nurseries</p>

          {isMobile ? (
            <Link href="/register" prefetch={false}>
              <a className={styles.register}>Get started</a>
            </Link>
          ) : (
            <Link href="/register">
              <a className={styles.register}>Get started</a>
            </Link>
          )}
        </div>
      </div>
      <FirstBlock />
      <SecondBlock />

      <Head>
        <title>Garden House</title>

        <meta
          name="Description"
          content="Garden house is online platform for managing nurseries."
        ></meta>
      </Head>
    </div>
  );
}
