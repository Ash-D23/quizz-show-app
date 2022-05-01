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
import './ActivityChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

function ActivityChart({ results }) {
  const currentDate = new Date()

  const CalculateLast6Months = (date) => {
    const currentMonth = date.getMonth()

    let i=6, temp = currentMonth

    const labels = []

    while(i>0){
      if(temp<0){
        temp=11
      }

      labels.push(temp)
      temp--
      i--
    }

    return labels.reverse().map((item) => months[item])
  }

  const CalculateData = (data, date) => {
    const currentYear = date.getFullYear()
    const currentYearData = {}
    const prevYearData = {}

    data.forEach(element => {
      let elementDate = new Date(element.date)
      let elementYear = elementDate.getFullYear()
      let elementMonth = elementDate.getMonth()

      if(currentYear === elementYear){
        if(currentYearData[elementMonth]){
          currentYearData[elementMonth] += 1
        }
        else{
          currentYearData[elementMonth] = 1
        }
      }
      if(currentYear-1 === elementYear){
        if(prevYearData[elementMonth]){
          prevYearData[elementMonth] += 1
        }else{
          prevYearData[elementMonth] = 1
        }
        
      }

    });

    const results= []
    let i = 6, tempMonth = date.getMonth(), prevYearFlag = false

    while(i>0){
      if(tempMonth === -1){
        prevYearFlag = true
        tempMonth = 11
      }

      if(prevYearFlag){
        prevYearData[tempMonth] ? results.push(prevYearData[tempMonth]) : results.push(0)
      }else{
        currentYearData[tempMonth] ? results.push(currentYearData[tempMonth]) : results.push(0)
      }

      tempMonth--;
      i--;
    }
    
    return results.reverse()
  }

  const labels = CalculateLast6Months(currentDate)
  const Formattedresults = CalculateData(results, currentDate)

  const options = {
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