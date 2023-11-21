import React from 'react'
import styles from './RoomCard.module.scss'
import Image from 'next/image'
import { HotelsContext } from '../providers/hotels-context.js'
import { useContext } from 'react'

function RoomCard({ roomType, roomSize, bedTypes, roomFacilities, room, selectedRoom, updateSelectedRoom }) {

    const isSelected = selectedRoom && room._id === selectedRoom._id;
    const cardClass = isSelected ? `${styles.room_card} ${styles.selected}` : styles.room_card;

  return (
    <div className={cardClass} onClick={() => updateSelectedRoom(room)}>
      {  
      <>
      <div>
        <Image src={'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckl/vaerelser/comwell-klarskovgaard-sskl.jpg/c33e8c9597990158e72cede3c7a3fe87.webp'} alt={'room image'} width={300} height={200} />
      </div>
      <div>
        <h3 className={styles.room_type}>{roomType}</h3>
        <div className={styles.size}>{roomSize + " " + "m2"}</div> 
        <span>{bedTypes}</span>
        <div className={styles.facilities}>
        {roomFacilities.map((facility, index) => (
        <span key={index}>{facility}</span>
        ))}
        </div>
        </div>
       </>
    }
    </div>
  )
}

export default RoomCard