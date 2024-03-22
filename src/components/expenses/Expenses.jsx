import React, { useEffect } from 'react'
import { GlobalProvider, useGlobalContext } from '../context/GlobalContext';
import IncomeItem from '../incomes/IncomeItem';
import ExpenseForm from './ExpensesForm';
import styles from './expenses.module.css'

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteIncome, totalExpenses, getIncomes} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])
    return (
        <GlobalProvider>
            <div className={styles.ExpenseStyled}>
            <div className={styles.InnerLayout}>
                <h1>Expenses</h1>
                <h2 className={styles.totalIncome}>Total Expense: <span>${totalExpenses()}</span></h2>
                <div className={styles.incomeContent}>
                    <div className={styles.formContainer}>
                        <ExpenseForm />
                    </div>
                <div className={`${styles.incomes}`}>
                        {expenses.map((income) => {
                            const {_id, title, amount, time, category, description, type} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={time} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-white)"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
        </GlobalProvider>
    )
}



export default Expenses