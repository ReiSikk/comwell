import React from 'react'
import styles from '../organisms/Dashboard.module.scss'

function DashboardRoomCard({room, handleRoomToEdit}) {
  return (
    <div className={styles.room_card}>
        <div>
            <h3>{room.roomType}</h3>
            <p>{room.available ? 'Available' : 'Not available'}</p>
        </div>
        <div>
            <button onClick={() => handleRoomToEdit(room)}>Update</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default DashboardRoomCard