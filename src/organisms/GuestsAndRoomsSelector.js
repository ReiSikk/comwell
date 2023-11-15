import React from 'react'
import styles from './GuestsAndRoomsSelector.module.scss'
import IncrementInput from '../molecules/IncrementInput'
import { useState } from 'react'

function GuestsAndRoomsSelector() {
 const [guestsAndRooms, setGuestsAndRooms] = useState({
    rooms: 1,
    adults: 1,
    kids: 0,
    infants: 0
 });

 const handleInputChange = (id, value) => {
    console.log("called", id, value);
    setGuestsAndRooms(prevState => ({ ...prevState, [id]: value }));
  };
  return (
    <div>
        <div className={styles.gr_selector}>
          <div className={styles.gr_upper}>
            <span>Room 1</span>
          </div>
          <div className={styles.gr_lower}>
            <div className={styles.gr_input_cell}>
                <span>Adults</span>
                <IncrementInput inputData={"Adults"} id={"adults"} onInputChange={handleInputChange}  guestsAndRooms={guestsAndRooms} />
            </div>
            <div className={styles.gr_input_cell}>
                <span>Kids</span>
                <IncrementInput inputData={"Kids"} id={"kids"} onInputChange={handleInputChange} guestsAndRooms={guestsAndRooms} />
            </div>
            <div className={styles.gr_input_cell}>
                <span>Infants</span>
                <IncrementInput inputData={"Infats"} id={"infants"} onInputChange={handleInputChange} guestsAndRooms={guestsAndRooms} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default GuestsAndRoomsSelector