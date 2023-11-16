import React from 'react'
import styles from './GuestsAndRoomsSelector.module.scss'
import IncrementInput from '../molecules/IncrementInput'
import { useContext } from 'react'
import { HotelsContext } from '../providers/hotels-context.js'

function GuestsAndRoomsSelector() {

  const { handleInputChange, guestsAndRooms }= useContext(HotelsContext);

  return (
    <div>
        <div className={styles.gr_selector}>
          <div className={styles.gr_upper}>
            <span className={styles.small_label}>Room 1</span>
          </div>
          <div className={styles.gr_lower}>
            <div className={styles.gr_input_cell}>
                <span>Adults</span>
                <IncrementInput inputData={"Adults"} id={"adults"} onInputChange={handleInputChange}  guestsAndRooms={guestsAndRooms} />
            </div>
            <div className={styles.gr_input_cell}>
              <div className={styles.label_flex}>
                <span>Kids</span>
                <span className={styles.small_label}>3 - 11 years</span>
              </div>
                <IncrementInput inputData={"Kids"} id={"kids"} onInputChange={handleInputChange} guestsAndRooms={guestsAndRooms} />
            </div>
            <div className={styles.gr_input_cell}>
              <div className={styles.label_flex}>
                <span>Infants (0-2 years)</span>
                <span className={styles.small_label}>0 - 2 years</span>
              </div>
                <IncrementInput inputData={"Infats"} id={"infants"} onInputChange={handleInputChange} guestsAndRooms={guestsAndRooms} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default GuestsAndRoomsSelector