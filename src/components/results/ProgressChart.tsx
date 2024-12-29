
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type ProgressChartProps = {
    score: number;
  };
const ProgressChart: React.FC<ProgressChartProps> = ({ score }) => (
  <div>
    <CircularProgressbar
      value={score}
      className="text-primary w-40"
      text={`${score.toFixed(2)}/100`}
      strokeWidth={10}
      styles={{
        path: {
          stroke: '#10375C',
          strokeLinecap: 'round',
        },
        text: {
          fill: '#10375C',
          fontSize: '12px',
          fontWeight: 'bold',
          dominantBaseline: 'middle',
          textAnchor: 'middle',
        },
        trail: {
          stroke: '#d6d6d6',
        },
      }}
    />
  </div>
);

export default ProgressChart;
