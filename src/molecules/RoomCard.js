import React from 'react'
import styles from './RoomCard.module.scss'
import Image from 'next/image'
import { HotelsContext } from '../providers/hotels-context.js'
import { useContext,useState, useEffect } from 'react'

function RoomCard({ roomType, roomSize, bedTypes, roomFacilities, roomPrice, room, selectedRoom, updateSelectedRoom }) {

    const isSelected = selectedRoom && room._id === selectedRoom._id;
    const cardClass = isSelected ? `${styles.room_card} ${styles.selected}` : styles.room_card;
    
    //generate a room description based on room type
    function getRoomDescription(roomType) {
        switch (roomType) {
          case 'Superior room':
            return 'A superior room offers more space and comfort, often with additional amenities.';
          case 'Double room':
            return 'A double room features a double bed or two single beds, perfect for couples or friends.';
          case 'Single room':
            return 'A single room is designed for one person and usually contains a single bed.';
          default:
            return '';
        }
      }


        //generate a room image based on room type
      let imageSrc;
      if (roomType === 'Single room') {
          imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckl/vaerelser/comwell-klarskovgaard-sskl.jpg/c33e8c9597990158e72cede3c7a3fe87.webp';
      } else if (roomType === 'Double room') {
          imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/comwell-portside-sdcp-01.jpg/2649c268a1692f8c78a8d8d60bd33147.webp';
      } else {
          imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/comwell-portside-spcp-01.jpg/2bad9358ed8aaae051e19245559e3b8e.jpg';
      }


  return (

    <div className={cardClass} onClick={() => updateSelectedRoom(room)}>
      {  
      <>
      <div>
        <Image 
        src={imageSrc} 
        alt='Hotel room image'
        fill
        style={{objectFit:"cover"}}
        sizes='100vw, 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w, 3840w'
    />
      </div>
      <div>
        <h3 className={styles.room_type}>{roomType}</h3>
        <div className={styles.size}>{roomSize + " " + "m2"}</div> 
        <div className={styles.card_info}>
        <span>{bedTypes}</span>
        <div className={styles.facilities}>
        {roomFacilities.map((facility, index) => (
        <span key={index}>{facility}</span>
        ))}
        </div>
        <div>
            <p>{getRoomDescription(roomType)}</p>
        </div>
        <div className={styles.price}>
            <span>{roomPrice} kr.</span>
            <span>per night</span>
        </div> 
        </div>   

        </div>
       </>
    }
    </div>
  )
}

export default RoomCard