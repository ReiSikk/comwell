import React from 'react'
import styles from './RoomCard.module.scss'
import Image from 'next/image'

function RoomCard({ roomType, roomSize, bedTypes, roomFacilities }) {
  return (
    <div className={styles.room_card}>
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