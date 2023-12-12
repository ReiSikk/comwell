import React from 'react'
import styles from '../organisms/Dashboard.module.scss'

function DashboardLeft() {
  return (
    <div className={styles.dash_left}>
        <div>
            <button>Hotels</button>
        </div>
        <div className={styles.dash_left__hotels}>
            Hotels displayed here
        </div>
    </div>
  )
}

export default DashboardLeft