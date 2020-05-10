import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.scss";
import Navbar from "../components/Layout/Navbar";
import FirstBlock from "../components/Homepage/firstBlock";
import SecondBlock from "../components/Homepage/secondBlock";


export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.innerContainer}>
          <img src="/assets/Logo.svg" className={styles.logo} />

          <p className={styles.slogan}>Platform for managing nurseries</p>

          <Link href="/">
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
            font-family: "Lato", sans-serif;
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
