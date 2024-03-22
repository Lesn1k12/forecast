import React, { useEffect } from 'react'
import styles from './barChart.module.css'
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

import { Bar } from 'react-chartjs-2'

    
function BarChart() {
    
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() =>{
        getIncomes()
        getExpenses()
    }, [])
    
    const data = {
    labels: ['incomes', 'expenses', 'balance'],
    datasets: [
        {
            label: 'balance',
            data: [totalIncome(), totalExpenses()*(-1), totalBalance()],
            borderColor: 'white',
            backgroundColor: [
                'rgba(75, 192, 192, 0.3)',
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)'
            ],
            hoverOffset: 4
        },
    ]

    };
       
    const options = {
        type: 'bar',
        locale: 'en-US',
        maintainAspectRatio: false,
        plugins: {
            title: {
              display: true,
              text: 'Total',
            },
            tooltip:{
                callbacks: {
                    label: (context) => {
                        const value = context.parsed.y;
                        let label;
                        if (value !== null){
                            label = new Intl.NumberFormat('en-US',{
                                style: 'currency',
                                currency: 'USD',
                                maximumSignificantDigits: 3,
                            }).format(value)
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y:{
                ticks: {
                    callback: ((value, index, values)=>{
                        return new Intl.NumberFormat('en-US',{
                            style: 'currency',
                            currency: 'USD',
                            maximumSignificantDigits: 3,
                        }).format(value)
                    })
                }
            }
        }
    }
    return (
        <div className={styles.Chartstyle}>
            <Bar data={data} options={options}/>
        </div>
    )
}


export default BarChart