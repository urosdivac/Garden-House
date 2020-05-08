import styles from "./index.module.scss";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/assets/Logo.svg" className={styles.logo} />

      <p className={styles.slogan}>Platform for managing nurseries</p>

      <Link href="/" className={styles.hoverz}>
        <a className={styles.register}>Get started</a>
      </Link>

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
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
    </div>
  );
}
