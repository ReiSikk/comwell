import React from 'react'
import { useState, useEffect } from 'react'
import styles from './RoomDetails.module.scss'
import Image from 'next/image'

function RoomDetails({room}) {

    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setOpacity(1);
      }, 100); // Start the animation after 100ms
  
      return () => clearTimeout(timer); // Clean up the timer
    }, []);

        //generate a room image based on room type
        let imageSrc;
        if (room.roomType === 'Single room') {
            imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckl/vaerelser/comwell-klarskovgaard-sskl.jpg/c33e8c9597990158e72cede3c7a3fe87.webp';
        } else if (room.roomType === 'Double room') {
            imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/comwell-portside-sdcp-01.jpg/2649c268a1692f8c78a8d8d60bd33147.webp';
        } else {
            imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/comwell-portside-spcp-01.jpg/2bad9358ed8aaae051e19245559e3b8e.jpg';
        }

  return (
    <>
        <div className={styles.room_img}>
            <Image src={imageSrc} alt='Hotel room image' fill={true} style={{objectFit:"contain"}} sizes='100vw, 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w, 3840w' />
        </div>
      <div className={styles.room_info_wrapper}>
      <div style={{opacity}} className={styles.room_details}>
        <div className={styles.room_info}>
            <div>
                <p className={styles.room_type}>{room.roomType}</p>
                <span className={styles.size_label}>{`${room.roomSize} m2`}</span>
            </div>
        </div>
      </div>
      <div>
        <div className={styles.facilities}>
                 {room.facilities.map((facility, index) => (
                 <span key={index}>{facility}</span>
                 ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default RoomDetails