import {useRef, useEffect} from 'react';
import Chart from 'chart.js';
const styles = require('./Graph.module.scss');

interface Props {
  stats: any[];
  data: any[];
}

const Graph = ({stats, data}: Props) => {
  const graph = useRef(null);
  let colors = [];

  if (stats) {
    if (stats.length === 3) {
      colors = ['#0f9d58', '#db4537'];
    } else {
      colors = ['#0f9d58', '#db4537', '#f4b300'];
    }
  }

  useEffect(() => {
    let myChart = graph.current;
    let dataArr = [];

    const formatedData = data.map(item =>
      new Date(item.created_at).toLocaleDateString(),
    );
    const reversedArr = formatedData.reverse();

    const counts = {};
    reversedArr.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    if (stats.length === 3) {
      dataArr.unshift(stats[1], stats[2]);
    } else {
      dataArr.unshift(stats[1], stats[2], stats[3]);
    }

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
            backgroundColor: 'rgba(48, 196, 126,0.8)',
            fill: false,
            borderColor: 'rgba(48, 196, 126,0.8)',
          },
        ],
      },

      options: {
        title: {
          display: true,
          text: 'Registration statistics',
          fontSize: 24,
          fontColor: '#777',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
        },
        legend: {
          display: false,
          position: 'right',
          labels: {
            fontColor: 'green',
          },
          fontFamily: 'Roboto',
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
        fontFamily: 'Roboto',
      },
    });
  }, [data, stats]);

  return (
    <div className={styles.container}>
      <canvas className={styles.graphChart} ref={graph}></canvas>
    </div>
  );
};

export default Graph;
