import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Layout/Navbar';
import FirstBlock from '../components/Homepage/firstBlock';
import SecondBlock from '../components/Homepage/secondBlock';
const styles = require('./index.module.scss');

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <Navbar />

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

      <Head>
        <title>Garden House</title>

        <meta
          name="Description"
          content="Garden house is online platform for managing nurseries."
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
      </Head>
    </div>
  );
}
