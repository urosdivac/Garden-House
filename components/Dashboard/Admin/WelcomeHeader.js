import styles from './WelcomeHeader.module.scss';

const WelcomeMessage = props => {
  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <p className={styles.heading}>Admin dashboard</p>
      </div>
      <div className={styles.welcomeWrapper}>
        <div className={styles.welcomeTextWrapper}>
          <p className={styles.weclomeHeader}>Welcome back, {props.name}</p>

          <p className={styles.welcomeText}>
            There were <b>{props.requestsNumber}</b> new requests since your
            last login
          </p>
        </div>

        <img
          src="/assets/requests.svg"
          className={styles.requests}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default WelcomeMessage;
