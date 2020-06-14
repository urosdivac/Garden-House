import Graph from './Graph';
import Pie from './PieChart';
const styles = require('./WelcomeHeader.module.scss');
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import HelpIcon from '@material-ui/icons/Help';

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
      <div className={styles.chartsWrapper}>
        <div className={styles.graphWrapper}>
          <div className={styles.graphTitleWrapper}>
            <p>Registration Statistics</p>
          </div>
          <Graph stats={stats} data={data} />
        </div>

        <div className={styles.pieWrapper}>
          <div className={styles.graphTitleWrapper}>
            <p>Acceptance rate</p>
          </div>
          <div className={styles.pieInnerWrapper}>
            <Pie stats={stats} />
            <div className={styles.labelWrapper}>
              <div className={styles.labelInnerWrapper}>
                <div className={styles.acceptedWrapper}>
                  <CheckIcon className={styles.acceptedIcon} />
                </div>
                <p>Accepted</p>
              </div>
              <div className={styles.labelInnerWrapper}>
                <div className={styles.declinedWrapper}>
                  <BlockIcon className={styles.declinedIcon} />
                </div>
                <p>Declined</p>
              </div>
              <div className={styles.labelInnerWrapper}>
                <div className={styles.pendingWrapper}>
                  <HelpIcon className={styles.pendingIcon} />
                </div>
                <p>Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
