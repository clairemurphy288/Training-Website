import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


//want to create an event that highlights graph
export default function BarGraph(props) {
    console.log(props.data);

    const options = {
        responsive: true,
        plugins: {
          legend: {
          },
          title: {
            display: true,
            text: 'Overall Productivity',
          },
        },
      };
    
    const labels = props.data.map((o) => [ o.user,o.title, new Date(o.dateCompleted).toLocaleString()]);
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Actual Time',
          data: labels.map((o, index) => props.data[index].actualTotalTime/1000 ),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Total Time',
          data: labels.map((o, index) => props.data[index].performedTotalTime/1000),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

  return <Bar options={options} data={data} />;
}

