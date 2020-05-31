import {useRef, useEffect} from 'react';
import Chart from 'chart.js';
import styles from './Graph.module.scss';

const Graph = props => {
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

    const formatedData = props.data.map(item =>
      new Date(item.created_at).toLocaleDateString(),
    );
    const reversedArr = formatedData.reverse();

    const counts = {};
    reversedArr.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    if (props.stats.length === 3) {
      data.unshift(props.stats[1], props.stats[2]);
    } else {
      data.unshift(props.stats[1], props.stats[2], props.stats[3]);
    }
    console.log(counts);

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    new Chart(myChart, {
      type: 'line',
      data: {
        labels: Object.keys(counts),
        datasets: [
          {
            data: Object.values(counts),
            backgroundColor: 'rgba(48, 196, 126,0.6)',
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Registration statistics',
          fontSize: 22,
          fontColor: '#777',
          fontFamily: 'Lato',
        },
        legend: {
          display: false,
          position: 'right',
          labels: {
            fontColor: 'green',
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
      <canvas className={styles.graphChart} ref={graph}></canvas>
    </div>
  );
};

export default Graph;
