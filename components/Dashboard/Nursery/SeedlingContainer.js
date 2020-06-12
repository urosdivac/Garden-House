import {useState, useEffect} from 'react';
import styles from './SeedlingContainer.module.scss';
import moment from 'moment';
import ProgressBar from './ProgressBar';

const SeedlingContainer = props => {
  const [percentage, setPercentage] = useState(50);

  const calculateProgress = date => {
    const totalHours = 480;

    const hoursPassed = Math.floor((new Date(date) - new Date()) / 1000 / 3600);

    const hoursLeft = totalHours - hoursPassed;

    const percentageDone = Math.floor((hoursLeft / totalHours) * 100);

    if (percentageDone < 0) return setPercentage(100);

    setPercentage(percentageDone);
  };

  useEffect(() => {
    calculateProgress(props.harvestdate);
  }, []);
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
