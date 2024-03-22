import React, { useEffect } from 'react'
import styles from './donutChart.module.css'
import { GlobalProvider, useGlobalContext } from '../context/GlobalContext';
import 'chart.js/auto'

import {Chart as ChartJs, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

import { Doughnut  } from 'react-chartjs-2'

function DonutChart() {

  const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses} = useGlobalContext()

  useEffect(() =>{
    getIncomes()
    getExpenses()
  }, [])



  const data = {
    labels: [
      'incomes',
      'expenses',
    ],
    datasets: [{
      label: [],
      data: [totalIncome(), totalExpenses()*(-1)],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    type: 'doughnut',
    locale: 'en-US',
    maintainAspectRatio: false,
  }
    
  return (
      <div className={`${styles.Chartstyle}`}>
        <Doughnut
          data={data} 
          options={options}
          >
        </Doughnut>
      </div>
  )
}

export default DonutChart
