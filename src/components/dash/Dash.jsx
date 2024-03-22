import React, { useEffect } from 'react'
import '../components.css'
import { LiaDollarSignSolid } from "react-icons/lia";
import History from '../history/History'
import { useGlobalContext, GlobalProvider } from '../context/GlobalContext';
import Chart from '../chart/Chart'

function Dash() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
    
    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

  return (
    <GlobalProvider>
    <div className="DashStyles">
        <div className='InnerLayout'>
        <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {<LiaDollarSignSolid />} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {<LiaDollarSignSolid />} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {<LiaDollarSignSolid />} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <div className="salary">
                            <h2 className="salary-title">Max <span>Incomes</span>Max</h2>
                            <div className="salary-item">
                                <p>
                                    {incomes.length > 0 ? `$${Math.min(...incomes.map(item => item.amount))}` : '0'}
                                </p>
                                <p>
                                    {incomes.length > 0 ? `$${Math.max(...incomes.map(item => item.amount))}` : '0'}
                                </p>
                            </div>
                            <h2 className="salary-title">Min <span>Expenses</span>Max</h2>
                            <div className="salary-item">
                                <p>
                                    {expenses.length > 0 ? `$${Math.max(...expenses.map(item => item.amount))}` : '0'}
                                </p>
                                <p>
                                    {expenses.length > 0 ? `$${Math.min(...expenses.map(item => item.amount))}` : '0'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </GlobalProvider>
  )
}

export default Dash