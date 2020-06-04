import Graph from './Graph';
import Pie from './PieChart';
const styles = require('./WelcomeHeader.module.scss');

interface Props {
  name: string;
  requestsNumber: number;
  stats: any[];
  data: any[];
}

const WelcomeMessage = ({name, requestsNumber, stats, data}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <p className={styles.heading}>Admin dashboard</p>
      </div>
      <div className={styles.welcomeWrapper}>
        <div className={styles.firstBlock}>
          <div className={styles.welcomeTextWrapper}>
            <p className={styles.weclomeHeader}>Welcome back, {name}</p>
            {requestsNumber === 1 ? (
              <p className={styles.welcomeText}>
                There was <b>{requestsNumber}</b> new request since your last
                login
              </p>
            ) : (
              <p className={styles.welcomeText}>
                There were <b>{requestsNumber}</b> new requests since your last
                login
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
          <div className={styles.pieWrapper}>
            <Pie stats={stats} />
          </div>
          <Graph stats={stats} data={data} />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
