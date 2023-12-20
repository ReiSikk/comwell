import React from 'react'
import styles from '../organisms/Dashboard.module.scss'
import DashboardRoomCard from './DashboardRoomCard'
import CheckboxWithText from '../atoms/CheckboxWithText'
import { useState, useEffect } from 'react'
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


      // Universal check for empty values
      const [errorMessages, setErrorMessages] = useState({
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
              errorMessage = "Please enter a room type";
              }
          if (id === 'bedTypes') {
              errorMessage = "Please enter bed types";
              }
          if (id === 'facilities') {
              errorMessage = "Please select at least one of the facilities";
              }
          if (id === 'roomSize') {
              errorMessage = "Please enter a room size";
              }
          if (id === 'price') {
              errorMessage = "Please enter  a room price";
              }
          }

        setErrorMessages(prevErrors => ({
            ...prevErrors,
            [id]: errorMessage
          }));

        if(id === 'bedTypes') {
            value = value.split(',').filter(item => item.trim().length > 0);
        }

        setRoomData(prevRoomData => ({
          ...prevRoomData,
          [id]: value
        }));
      };


      const validateForm = () => {
        for (const error in errorMessages) {
          if (errorMessages[error]) {
            return false;
          }
        }
        return true;
      };

      //call backend to update room
      const handleRoomUpdate = async (e) => {
        e.preventDefault();
        console.log(roomData, ' roomData in handleRoomUpdate');
        const formIsValid = validateForm();
        if (!formIsValid) {
            displayErrorMessages();
          return;
        }
       if(formIsValid) {
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
           showMessage("Room updated successfully!");
          }
        } 
        catch (error) {
          console.error(error);
        }
    } else {
        alert('form is not valid');
    }
      };


      const [uiMessage, setUiMessage] = useState('');

const showMessage = (message) => {
  setUiMessage(message);
  setTimeout(() => {
    setUiMessage('');
  }, 2000);
};

      function displayErrorMessages() {
        const errorMessagesArray = [];

          for (const error in errorMessages) {
            if (errorMessages[error]) {
              errorMessagesArray.push(errorMessages[error]);
            }
          }

  if (errorMessagesArray.length > 0) {
    showMessage(errorMessagesArray.join(' and ' + "\n"));
  }
      }





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
              <DashboardRoomCard key={room._id} room={room} handleRoomToEdit={handleRoomToEdit} onInputChange={handleInputChange} showMessage={showMessage} />
            ))}
          </div>
         </div>
    { roomToEdit ?
       <div className={styles.inputs}>
        <CheckboxWithText id="Available" label="Room is available" onCheckboxChange={handleAvailability} />
        {errorMessages.bedTypes && <p className={styles.error}>{errorMessages.available}</p>}
        <InputField inputId={"roomType"} id="roomType" label="Room type" propValue={roomToEdit?.roomType} onInputChange={handleInputChange} />
        {errorMessages.roomType && <p className={styles.error}>{errorMessages.roomType}</p>}
        <InputField inputId={"bedTypes"} id="bedTypes" label="Bed types" propValue={roomToEdit?.bedTypes} onInputChange={handleInputChange} />
        {errorMessages.bedTypes && <p className={styles.error}>{errorMessages.bedTypes}</p>}
        <CheckboxGroup options={allRoomFacilities} value={roomData.facilities || []} onChange={(value) => handleInputChange('facilities', value)} />
        {errorMessages.facilities && <p className={styles.error}>{errorMessages.facilities}</p>}
        <InputField inputId={"roomSize"} id="roomSize" label="Room size" propValue={roomToEdit?.roomSize} onInputChange={handleInputChange} />
        {errorMessages.roomSize && <p className={styles.error}>{errorMessages.roomSize}</p>}
        <InputField inputId={"price"} id="price" type={"number"} label="Room price" propValue={roomToEdit?.price} onInputChange={handleInputChange} />
        {errorMessages.price && <p className={styles.error}>{errorMessages.price}</p>}
        <button onClick={handleRoomUpdate}>Save updates</button>
       </div> 
       : 
       <div className={styles.ui_message}>
          <p>Select a room to make changes</p>
        </div>

}
{uiMessage && <div className={styles.validation_message}>{uiMessage}</div>}
    </div>
 </div>
  )
}

export default DashboardRight