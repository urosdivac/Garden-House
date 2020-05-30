import styles from './WelcomeHeader.module.scss';
import {SimplePieChart} from './Chart';

const WelcomeMessage = props => {
  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <p className={styles.heading}>Admin dashboard</p>
      </div>
      <div className={styles.welcomeWrapper}>
        <div className={styles.firstBlock}>
          <div className={styles.welcomeTextWrapper}>
            <p className={styles.weclomeHeader}>Welcome back, {props.name}</p>
            {props.requestsNumber === 1 ? (
              <p className={styles.welcomeText}>
                There was <b>{props.requestsNumber}</b> new request since your
                last login
              </p>
            ) : (
              <p className={styles.welcomeText}>
                There were <b>{props.requestsNumber}</b> new requests since your
                last login
              </p>
            )}
          </div>

          <img
            src="/assets/requests.svg"
            className={styles.requests}
            alt="logo"
          />
        </div>
        <div className={styles.statsWrapper}>
          <SimplePieChart stats={props.stats}/>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
