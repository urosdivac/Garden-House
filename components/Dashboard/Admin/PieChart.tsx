import {useRef, useEffect} from 'react';
import Chart from 'chart.js';
const styles = require('./PieChart.module.scss');

interface Props {
  stats: any[];
}

const Pie = ({stats}: Props) => {
  const graph = useRef(null);
  let colors = [];

  if (stats) {
    if (stats.length === 3) {
      colors = ['rgba(48, 196, 126,0.8)', 'rgba(219, 69, 55,0.8)'];
    } else {
      colors = [
        'rgba(48, 196, 126,0.8)',
        'rgba(219, 69, 55,0.8)',
        'rgba(244, 179, 0,0.8)',
      ];
    }
  }

  useEffect(() => {
    let myChart = graph.current;
    let data = [];

    if (stats.length === 3) {
      data.unshift(stats[1], stats[2]);
    } else {
      data.unshift(stats[1], stats[2], stats[3]);
    }

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    new Chart(myChart, {
      type: 'doughnut',
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
          fontSize: 24,
          fontColor: '#777',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
        },
        legend: {
          display: false,
          position: 'right',
          labels: {
            fontColor: 'rgba(0,0,0,0.5)',
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          },
          fontFamily: 'Roboto',
        },
        tooltips: {
          enabled: true,
          fontFamily: 'Roboto',
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [stats]);

  return (
    <div className={styles.container}>
      <canvas className={styles.pieChart} ref={graph}></canvas>
    </div>
  );
};

export default Pie;
