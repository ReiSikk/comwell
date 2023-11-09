import React from 'react'
import styles from './HotelCard.module.scss'


function HotelCard({ hotel, updateSelectedHotel, selectedHotel }) {
    const isSelected = selectedHotel && hotel._id === selectedHotel._id;
    const cardClass = isSelected ? `${styles.hotel_card} ${styles.selected}` : styles.hotel_card;

  return (
    <div className={cardClass}  onClick={() => updateSelectedHotel(hotel)}>
        <div className={styles.hotel_img}>

        </div>
        <div className={styles.card_flex}>
          <div>
              <p>{hotel.name}</p>
              <span>{hotel.location}</span>
          </div>
          <div className={styles.icon}>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><rect></rect><path fill="currentColor" fill-rule="evenodd" d="M6.668 10.6 3.134 7.067l-.733.666 3.533 3.534.734.733 7.067-7.067L13 4.2l-6.333 6.4Z" clip-rule="evenodd"></path></svg>
              </div>
          </div>
        </div>

    </div>
  )
}

export default HotelCard