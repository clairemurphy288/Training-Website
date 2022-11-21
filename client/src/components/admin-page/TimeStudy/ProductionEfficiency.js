import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function ProductionGraph(props) {

const options = {
    responsive: true,
    plugins: {
      legend: {
      },
      title: {
        display: true,
        text: 'Overall % Production Productivity',
      },
    },
  };

  
  const labels = props.data.map((o) => [ o.user,o.title, new Date(o.dateCompleted).toLocaleString()]);
  
  const data = {
    labels,
    datasets: [
      {
        label: '% Labor Productivity',
        data: labels.map((o, index) => Math.round(props.data[index].performedTotalTime/props.data[index].standardWork * 100)/1000 ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };


  return <Line options={options} data={data} />;
}