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
            <Image src={imageSrc} alt='Hotel room image' fill={true} style={{objectFit:"cover"}} sizes='100vw, 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w, 3840w' />
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
        <span>Facilities:</span>
        <div className={styles.facilities}>
                 {room.facilities.map((facility, index) => (
                 <span key={index}>{facility}</span>
                 ))}
        </div>
      </div>
    </div>
    <section className={styles.packages_wrapper}>
        <h2>Packages</h2>
        <div className={styles.packages}>
  {[
    {
      title: "Overnight stay with breakfast - Save 12%",
      description: "Enjoy a comfortable overnight stay with a delicious breakfast. Save 12% with this package.",
      price: Math.floor(Math.random() * 2000) + 2100
    },
    {
      title: "Overnight stay with breakfast buffet",
      description: "Experience a luxurious overnight stay complemented by a rich breakfast buffet.",
      price: Math.floor(Math.random() * 2000) + 2100
    },
    {
      title: "Spadelight at two Comwell-hotels",
      description: "Relax and rejuvenate with our Spadelight package at two Comwell hotels.",
      price: Math.floor(Math.random() * 2000) + 2100
    },
    {
      title: "Blissful Break",
      description: "Take a break from your routine and enjoy a blissful stay at our hotel.",
      price: Math.floor(Math.random() * 2000) + 2100
    },
    {
      title: "SpaRetreat at two Comwell-hotels",
      description: "Indulge in a soothing SpaRetreat at two of our Comwell hotels.",
      price: Math.floor(Math.random() * 2000) + 2100
    },
  ].map((bundle, index) => (
    <div key={index} className={styles.package_card}>
      <h3>{bundle.title}</h3>
      <p>{bundle.description}</p>
      <span>Read more about this package</span>
      <p className={styles.price}>{`${bundle.price} kr.`}</p>
      <div className={styles.icon}></div>
    </div>
  ))}
</div>
    </section>
    </>
  )
}

export default RoomDetails