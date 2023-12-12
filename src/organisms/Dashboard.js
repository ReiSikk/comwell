import React from 'react'
import styles from './Dashboard.module.scss'
import DashboardLeft from '../molecules/DashboardLeft'
import DashboardRight from '../molecules/DashboardRight'

function Dashboard() {
  return (
    <div className={styles.wrapper}>
        <DashboardLeft />
        <DashboardRight />
    </div>
  )
}

export default Dashboard