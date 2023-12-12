import React from 'react'
import styles from '../organisms/Dashboard.module.scss'

function DashboardRoomCard() {
  return (
    <div className={styles.room_card}>
        <div>
            <h3>Room Name</h3>
            <p>Room ID</p>
        </div>
        <div>
            <button>Update</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default DashboardRoomCard