import React from 'react'
import styles from '../organisms/Dashboard.module.scss'

function DashboardRoomCard({room, handleRoomToEdit}) {

  async function deleteRoom(roomId) {
    try {
      const response = await fetch(`http://127.0.0.1:3005/rooms/${roomId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        console.log(response, ' response in deleteRoom');
        const message = response.statusText || `An error has occurred with the status code: ${response.status}`;
        alert(message);
      }
  
      if (response.status === 200) {
        showMessage("Room deleted successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.room_card}>
        <div>
            <h3>{room.roomType}</h3>
            <p>{room.available ? 'Available' : 'Not available'}</p>
        </div>
        <div>
            <button onClick={() => handleRoomToEdit(room)}>Update</button>
            <button onClick={() => deleteRoom(room._id)}>Delete</button>
        </div>
    </div>
  )
}

export default DashboardRoomCard