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
import { CalculateData, CalculateLast6Months } from '../../Utilities';
import './ActivityChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ActivityChart({ results } : any) {
  const currentDate = new Date()

  const labels = CalculateLast6Months(currentDate)
  const Formattedresults = CalculateData(results, currentDate)

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Activity',
      },
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Games',
        data: Formattedresults,
        backgroundColor: '#7F4CF6',
      }
    ],
  };

  return (
    <div className="activity-chart--container">
      <Bar options={options} data={data} />
    </div>
  );

}

export { ActivityChart }