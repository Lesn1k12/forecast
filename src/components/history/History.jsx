import React from 'react'
import styles from './history.module.css'
import { useGlobalContext } from '../context/GlobalContext';

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <div className={styles.HistoryStyled} >
            <h2>Recent History</h2>
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className={styles.historyItem}>
                        <p style={{
                            color: amount < 0 ? 'red' : 'green'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: amount < 0 ? 'red' : 'green'
                        }}>
                            {amount}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}



export default History