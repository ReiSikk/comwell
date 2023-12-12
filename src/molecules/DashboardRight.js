import React from 'react'
import styles from '../organisms/Dashboard.module.scss'
import DashboardRoomCard from './DashboardRoomCard'

function DashboardRight() {
  return (
    <div className={styles.dash_right}>
         <div className={styles.dash_right_top}>
            <h2>Hotel Name</h2>
            <p>Manage rooms</p>
         </div>
         <div className={styles.dash_right_left}>
         <h4>Rooms</h4>
          <div className={styles.rooms}>
            <DashboardRoomCard />
        </div>
       </div>
    </div>
  )
}

export default DashboardRight