import React from 'react'
import styles from './HotelCard.module.scss'


function HotelCard({ hotel }) {
  return (
    <div className={styles.hotel_card}>
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