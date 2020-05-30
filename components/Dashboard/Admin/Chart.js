import * as d3 from 'd3';
import {useState} from 'react';

export const SimplePieChart = props => {
  const [stats, setStats] = useState(props.stats);
  let colors = [];

  if (stats) {
    if (stats.length === 3) {
      colors = ['#4286f4', '#0f9d58', '#db4537'];
    } else {
      colors = ['#4286f4', '#db4537', '#0f9d58', '#f4b300'];
    }
  }

  const height = 300;
  const width = 300;
  const data = props.stats;
  let pie = d3.pie()(data);

  return (
    <div>
      <svg height={height} width={width}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          <Slice pie={pie} colors={colors} />
        </g>
      </svg>
    </div>
  );
};

const Slice = props => {
  let {pie} = props;

  let arc = d3.arc().innerRadius(0).outerRadius(100);

  return pie.map((slice, index) => {
    return (
      <path
        d={arc(slice)}
        fill={props.colors[index]}
        key={index}
        label={'hi'}
      />
    );
  });
};
