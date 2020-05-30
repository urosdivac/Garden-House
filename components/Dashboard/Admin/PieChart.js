import {useRef, useEffect} from 'react';
import Chart from 'chart.js';
import styles from './Graph.module.scss';

const Pie = props => {
  const graph = useRef(null);
  let colors = [];

  if (props.stats) {
    if (props.stats.length === 3) {
      colors = ['#0f9d58', '#db4537'];
    } else {
      colors = ['#0f9d58', '#db4537', '#f4b300'];
    }
  }

  useEffect(() => {
    let myChart = graph.current;
    let data = [];

    if (props.stats.length === 3) {
      data.unshift(props.stats[1], props.stats[2]);
    } else {
      data.unshift(props.stats[1], props.stats[2], props.stats[3]);
    }

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    new Chart(myChart, {
      type: 'pie',
      data: {
        labels: ['Accepted', 'Declined', 'Pending'],
        datasets: [
          {
            data: data,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Acceptance rate',
          fontSize: 25,
        },
        legend: {
          display: false,
          position: 'right',
          labels: {
            fontColor: '#777',
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        tooltips: {
          enabled: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [props.stats]);

  return (
    <div className={styles.container}>
      <canvas className={styles.myChart} ref={graph}></canvas>
    </div>
  );
};

export default Pie;
