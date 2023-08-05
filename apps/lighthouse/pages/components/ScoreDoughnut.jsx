import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import { Chart } from 'chart.js';
import { BarController } from 'chart.js/auto';

Chart.register(BarController);

const ScoreDoughnut = ({ score, category }) => {
  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#36A2EB', '#222831'],
        borderWidth: [0, 0],
      },
    ],
  };

  const options = {
    circumference: 360,
    rotation: -0.5 * Math.PI,
    cutout: '80%',
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    aspectRatio: 1,
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='relative'>
        <Doughnut data={data} options={options} />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h4>{score}</h4>
        </div>
      </div>
      <h4 className='mb-4'>{category}</h4>
    </div>
  );
};

export default ScoreDoughnut;
