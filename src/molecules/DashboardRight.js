import React from 'react'
import styles from '../organisms/Dashboard.module.scss'
import DashboardRoomCard from './DashboardRoomCard'
import CheckboxWithText from '../atoms/CheckboxWithText'
import { useState } from 'react'

function DashboardRight() {

    const [isAvailable, setIsAvailable] = useState(false);
    const handleAvailability = (newState) => {
        setIsAvailable(newState);
      };

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
       <div className={styles.inputs}>
        <CheckboxWithText id="Available" label="Room is available" errorMessage="Error setting availability" onCheckboxChange={handleAvailability} />
        </div>
    </div>
  )
}

export default DashboardRight