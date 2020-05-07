import styles from "./index.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/assets/default-monochrome.svg" className={styles.logo} />
      <p className={styles.slogan}>Platform for managing nurseries</p>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        // * {
        //   box-sizing: border-box;
        // }
      `}</style>
    </div>
  );
}
