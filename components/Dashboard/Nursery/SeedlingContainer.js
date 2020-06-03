import {useState, useEffect} from 'react';
import styles from './SeedlingContainer.module.scss';
import moment from 'moment';
import ProgressBar from './ProgressBar';

const SeedlingContainer = props => {
  const [percentage, setPercentage] = useState(0);
  const calculateProgress = () => {
    const result = moment(props.harvestdate).endOf('day').fromNow();
    const arr = result.split(' ');
    if (arr[1] === 'a') {
      setPercentage(100);
      return;
    }
    setPercentage((21 - arr[1] * 1) * 5);
  };

  useEffect(() => {
    calculateProgress();
  });
  return (
    <div className={styles.container}>
      <p>#{props.id}</p>
      <p>Harvest time :</p>
      <p>
        {moment(props.harvestdate) >= moment.now()
          ? moment(props.harvestdate).endOf('hour').fromNow() // in a day
          : 'Ready'}
      </p>

      <ProgressBar completed={percentage} />
    </div>
  );
};

export default SeedlingContainer;
