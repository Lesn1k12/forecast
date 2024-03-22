import React, { useEffect } from 'react'
import { useGlobalContext, GlobalProvider } from '../context/GlobalContext';
import Form from '../Form/Form';
import IncomeItem from './IncomeItem';
import styles from './incomes.module.css'

function Income() {
    const {addIncome,incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])
    return (
      <GlobalProvider>
        <div className={`${styles.IncomeStyled}`}>
            <div className={`${styles.InnerLayout}`}>
                <h1>Incomes</h1>
                <h2 className={`${styles.totalIncome}`}>Total Income: <span>${totalIncome()}</span></h2>
                <div className={`${styles.incomeContent}`}>
                    <div className={`${styles.formContainer}`}>
                        <Form />
                    </div>
                    <div className={`${styles.incomes}`}>
                        {incomes.map((income) => {
                            const {id, title, amount, time, category, description, type} = income;
                            return <IncomeItem
                                key={id}
                                id={id} 
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

export default Income