import React from 'react'
import styles from '../organisms/Dashboard.module.scss'
import DashboardRoomCard from './DashboardRoomCard'
import CheckboxWithText from '../atoms/CheckboxWithText'
import { useState } from 'react'
import InputField from '@/atoms/InputField'
import CheckboxGroup from '../atoms/CheckBoxGroup'

function DashboardRight({selectedHotelRoomsData, hotelToManage}) {

    //store updated room data
    const [roomData, setRoomData] = useState({});
    
    //handle room which is selected for edit
    const [roomToEdit, setRoomToEdit] = useState(null);
    const handleRoomToEdit = (room) => {
      setRoomToEdit(room);
      setRoomData(room);
    };
    

    const allRoomFacilities = [
        "Air conditioning",
        "Balcony",
        "Wifi",
        "TV",
        "Safe",
        "Mini bar",
        "Coffee machine",
    ]
    //handle room availability
    const [isAvailable, setIsAvailable] = useState(roomData.available);
    const handleAvailability = (newState) => {
        setIsAvailable(newState);
        setRoomData(prevRoomData => ({
          ...prevRoomData,
          available: newState
        }));
};

      
      //handle input changes on room edit
      const [errors, setErrors] = useState({
        available: "",
        roomType: "",
        bedTypes: "",
        facilities: "",
        roomSize: "",
        price: ""
      });
      const handleInputChange = (id, value) => {
        let errorMessage = '';

         // Universal check for empty value
  if (value.length === 0) {
    if (id === 'available') {
      errorMessage = "Please select availability";
    }
    if (id === 'roomType') {
        errorMessage = "Please enter room type";
        }
    if (id === 'bedTypes') {
        errorMessage = "Please enter bed types";
        }
    if (id === 'facilities') {
        errorMessage = "Please select facilities";
        }
    if (id === 'roomSize') {
        errorMessage = "Please enter room size";
        }
    if (id === 'price') {
        errorMessage = "Please enter room price";
        }
    }
        if(id === 'bedTypes') {
            value = value.split(',').filter(item => item.trim().length > 0);
        }

        //set error message if input is empty
        setErrors(prevErrors => ({
          ...prevErrors,
          [id]: errorMessage
        }));

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
            console.log(response, ' response in handleRoomUpdate');
            const message = response.statusText || `An error has occured with the status code: ${response.status}`;
            alert(message);
          }
          // Handle successful update...
          if (response.status === 200) {
            alert('Room updated successfully');
          }
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
        {errors.bedTypes && <p>{errors.available}</p>}
        <InputField inputId={"roomType"} id="roomType" label="Room type" propValue={roomToEdit?.roomType} onInputChange={handleInputChange} />
        {errors.roomType && <p>{errors.roomType}</p>}
        <InputField inputId={"bedTypes"} id="bedTypes" label="Bed types" propValue={roomToEdit?.bedTypes} onInputChange={handleInputChange} />
        {errors.bedTypes && <p>{errors.bedTypes}</p>}
        <CheckboxGroup options={allRoomFacilities} value={roomData.facilities || []} onChange={(value) => handleInputChange('facilities', value)} />
        {errors.facilities && <p>{errors.facilities}</p>}
        <InputField inputId={"roomSize"} id="roomSize" label="Room size" propValue={roomToEdit?.roomSize} onInputChange={handleInputChange} />
        {errors.roomSize && <p>{errors.roomSize}</p>}
        <InputField inputId={"price"} id="price" type={"number"} label="Room price" propValue={roomToEdit?.price} onInputChange={handleInputChange} />
        {errors.price && <p>{errors.price}</p>}
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