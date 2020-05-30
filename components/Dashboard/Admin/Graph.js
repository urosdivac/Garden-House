import {useRef, useEffect} from 'react';
import Chart from 'chart.js';
import styles from './Graph.module.scss';

const Graph = () => {
  const graph = useRef(null);

  useEffect(() => {
    let myChart = graph.current;

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    new Chart(myChart, {
      type: 'pie',
      data: {
        labels: [
          'Boston',
          'Worcester',
          'Springfield',
          'Lowell',
          'Cambridge',
          'New Bedford',
        ],
        datasets: [
          {
            label: 'Population',
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            //backgroundColor:'green',
            backgroundColor: ['#30C47E'],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Registrations by date',
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
  }, []);

  return (
    <div className={styles.container}>
      <canvas className={styles.myChart} ref={graph}></canvas>
    </div>
  );
};

export default Graph;
