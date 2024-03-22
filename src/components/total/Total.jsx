import React, { Component } from 'react'
import BarChart from '../barChart/BarChart'
import DonutChart from '../DonutChart/DonutChart'
import { GlobalProvider } from '../context/GlobalContext'
import styles from './total.module.css'
import ToDo from '../ToDo/AppToDo'
import SendButton from '../SendButton'


function Total() {
  return (
    <GlobalProvider>
      <div className={`${styles.totalStyles}`}>
        <div className={`${styles.InnerLayout}`}>
            <h1 className={`${styles.text}`}>Total</h1>
            <div className={`${styles.Charts}`}>
              <div className={`${styles.ChartsContainer}`}>
                <div className={`${styles.BarChart}`}>
                  <BarChart />
                </div>
                <div className={`${styles.DonutChart}`}>
                  <DonutChart />
                </div>
              </div>
            </div>
            <div className={`${styles.second}`}>
              <div className={`${styles.todo}`}><ToDo /></div>
              <div className={`${styles.sendBtn}`}><SendButton /></div>
            </div>
        </div>
      </div>
    </GlobalProvider>
  )
}

export default Total