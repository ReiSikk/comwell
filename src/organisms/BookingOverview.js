import React from 'react'
import styles from './BookingOverview.module.scss'
import Image from 'next/image'
import InputField from '@/atoms/InputField';

function BookingOverview({room}) {
    console.log(room, "room");

     //generate a room image based on room type
     let imageSrc;
     if (room.roomType === 'Single room') {
         imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckl/vaerelser/comwell-klarskovgaard-sskl.jpg/c33e8c9597990158e72cede3c7a3fe87.webp';
     } else if (room.roomType === 'Double room') {
         imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/comwell-portside-sdcp-01.jpg/2649c268a1692f8c78a8d8d60bd33147.webp';
     } else {
         imageSrc = 'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/comwell-portside-spcp-01.jpg/2bad9358ed8aaae051e19245559e3b8e.jpg';
     }

     const handleInputChange = (inputId, value) => {
        setSignUpData((prevInputValues) => ({
          ...prevInputValues,
          [inputId]: value,
        }));
        console.log(signUpData);
      };


  return (
    <div className={styles.booking_overview}>
        <section className={styles.guest_info}>
            <h2>Guest information</h2>
            <div className={styles.overview_input_flex}>
                <InputField label="Full name" inputId="fullName" type="text" onInputChange={handleInputChange} pattern="^[A-Za-z]+(\s[A-Za-z]+)+$" title="Please provide first and last name" />
                <InputField label="Email" inputId="signupEmail" type="email" onInputChange={handleInputChange} />
                <InputField label="Phone" inputId="phone" type="text" onInputChange={handleInputChange} pattern="^\+?[0-9]+$" minLength={5} title="You can only use digits and a plus for a country code"/>
            </div>
        </section>
        <section className={styles.overview}>
            <h2>Overview</h2>
            <div className={styles.price_image}>
                <div>
                <Image src={imageSrc} alt='Hotel room image' fill={true} style={{objectFit:"cover"}} sizes='100vw, 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w, 3840w' />
                </div>
                <p>{room.roomType}<span>{`${room.price} kr.`}</span></p>
            </div>
            <div className={styles.total}>
                <p>Total</p><span>{`${room.price} kr.`}</span>
            </div>
        </section>
    </div>
  )
}

export default BookingOverview