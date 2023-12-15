import React from 'react'
import styles from '../organisms/Dashboard.module.scss'
import DashboardRoomCard from './DashboardRoomCard'
import CheckboxWithText from '../atoms/CheckboxWithText'
import { useState } from 'react'
import InputField from '@/atoms/InputField'
import CheckboxGroup from '../atoms/CheckBoxGroup'

function DashboardRight({selectedHotelRoomsData, hotelToManage}) {
    console.log(hotelToManage, 'hotelToManage');

    const [isAvailable, setIsAvailable] = useState(false);
    const handleAvailability = (newState) => {
        setIsAvailable(newState);
      };

      const [roomToEdit, setRoomToEdit] = useState(null);
      const handleRoomToEdit = (room) => {
        setRoomToEdit(room);
        setRoomData(room);
      };
      const allRoomFacilities = roomToEdit?.facilities;
      
      //handle input changes on room edit
      const [roomData, setRoomData] = useState({});

      const handleInputChange = (id, value) => {
        setRoomData(prevRoomData => ({
          ...prevRoomData,
          [id]: value
        }));
      };

      //call backend to update room
      const handleRoomUpdate = async () => {
        console.log(roomData, ' roomData in handleRoomUpdate');
        if (!roomToEdit) {
          return;
        }
        try {
          const response = await fetch(`http://127.0.0.1:3005/rooms/${roomToEdit._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roomData)
          });
          if (!response.ok) {
            throw new Error('Failed to update room');
          }
          // Handle successful update...
        } catch (error) {
          console.error(error);
        }
      };

  return (
<div className={styles.dash_right}>
    <div className={styles.dash_right_top}>
            {hotelToManage && <h3>{hotelToManage.name}</h3>}
            <p>Manage rooms</p>
    </div>
    <div className={styles.flex}>
         <div className={styles.dash_right_left}>
          <div className={styles.rooms}>
          {selectedHotelRoomsData && selectedHotelRoomsData.map(room => (
              <DashboardRoomCard key={room._id} room={room} handleRoomToEdit={handleRoomToEdit} onInputChange={handleInputChange} />
            ))}
          </div>
         </div>
    { roomToEdit ?
       <div className={styles.inputs}>
        <CheckboxWithText id="Available" label="Room is available" onCheckboxChange={handleAvailability} />
        <InputField inputId={"roomType"} id="roomType" label="Room type" propValue={roomToEdit?.roomType} onInputChange={handleInputChange} />
        <InputField inputId={"bedTypes"} id="bedTypes" label="Bed types" propValue={roomToEdit?.bedTypes} onInputChange={handleInputChange} />
        <CheckboxGroup options={allRoomFacilities} value={roomData.facilities || []} onChange={(value) => handleInputChange('facilities', value)} />
        <InputField inputId={"roomSize"} id="roomSize" label="Room size" propValue={roomToEdit?.roomSize} onInputChange={handleInputChange} />
        <InputField inputId={"price"} id="price" label="Room price" propValue={roomToEdit?.price} onInputChange={handleInputChange} />
        <button onClick={handleRoomUpdate}>Save updates</button>
       </div> 
       : 
       <div className={styles.ui_message}>
          <p>Select a room to make changes</p>
        </div>

}
    </div>
 </div>
  )
}

export default DashboardRight