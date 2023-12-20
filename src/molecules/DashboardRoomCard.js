import {useState, useContext} from 'react'
import styles from '../organisms/Dashboard.module.scss'
import {  useAuth } from '../providers/AuthProvider';



function DashboardRoomCard({room, handleRoomToEdit, showMessage, setSelectedHotelRoomsData}) {
    const { token } = useAuth();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);


      const showDeleteConfirmation = (roomId) => {
       setShowConfirmDialog(true);
      }

      const handleConfirmDelete = (roomId) => {
        deleteRoom(roomId);
        setSelectedHotelRoomsData(prevRooms => prevRooms.filter(room => room._id !== roomId));
        setShowConfirmDialog(false);
      }
    

  async function deleteRoom(roomId) {
    try {
      const response = await fetch(`http://127.0.0.1:3005/rooms/${roomId}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
     },
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
    <>
    <div className={styles.room_card}>
        <div>
            <h3>{room.roomType}</h3>
            {room.available ? <span className={styles.available}>Available</span> : <span className={styles.not_available}>Not available</span>}
        </div>
        <div>
            <button onClick={() => handleRoomToEdit(room)}>Update</button>
            <button onClick={() => showDeleteConfirmation(room._id)}>Delete</button>
        </div>
    </div>
      {showConfirmDialog && (
        <div className={styles.confirm_dialog}>
          <p>Are you sure you want to delete this room?</p>
          <div>
          <button className={styles.yes_btn} onClick={() => handleConfirmDelete(room._id)}>Yes</button>
          <button className={styles.no_btn} onClick={() => setShowConfirmDialog(false)}>No</button>
          </div>
        </div>
      )}
      </>
  )
}

export default DashboardRoomCard