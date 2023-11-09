import React from 'react'
import styles from './HotelCard.module.scss'


function HotelCard({ hotel, updateSelectedHotel, selectedHotel }) {
    const isSelected = selectedHotel && hotel._id === selectedHotel._id;
    const cardClass = isSelected ? `${styles.hotel_card} ${styles.selected}` : styles.hotel_card;

  return (
    <div className={cardClass}  onClick={() => updateSelectedHotel(hotel)}>
        <div className={styles.hotel_img}>

        </div>
        <div>
            <p>{hotel.name}</p>
            <span>{hotel.location}</span>
        </div>

    </div>
  )
}

export default HotelCard