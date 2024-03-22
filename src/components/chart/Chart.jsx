import React, {useEffect} from 'react'
import styles from './chart.module.css'
import { GlobalProvider, useGlobalContext } from '../context/GlobalContext';

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

import moment from 'moment'
import {Line} from 'react-chartjs-2'



ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)
    

function Chart() {
    
    const {incomes, expenses, getIncomes} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])
    
    console.log(incomes)
    console.log(expenses)
    
    const dateFormat = (time) =>{
        return moment(time).format('MM/DD')
    }
    
    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount, time} = income
                        return { x: dateFormat(time), y: amount }
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount, time} = expense
                        return { x: dateFormat(time), y: amount }
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }

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
                        return ` ${label}`;
                    }
                }
            },
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
        },
        
    }

    return (
        <div className = {styles.Chartstyle} >
            <Line data={data} options={options}/>
        </div>
    )
}

export default Chart