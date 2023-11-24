import React from 'react'
import { useState, useContext } from 'react'
import styles from './BookingOverview.module.scss'
import Image from 'next/image'
import InputField from '../atoms/InputField';
import dayjs from 'dayjs';
import { HotelsContext } from '../providers/hotels-context.js'

function BookingOverview({room, bookingOverviewState}) {

    const {  selectedHotel, checkInOutDates, guestsAndRooms, selectedRoom }= useContext(HotelsContext);

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
          <h2>{bookingOverviewState.content === "overview" ? "Guest information" : "My booking"}</h2>
          {bookingOverviewState.content === "overview" ? (
            <div className={styles.overview_input_flex}>
              <InputField label="Full name" inputId="fullName" type="text" onInputChange={handleInputChange} pattern="^[A-Za-z]+(\s[A-Za-z]+)+$" title="Please provide first and last name" />
              <InputField label="Email" inputId="signupEmail" type="email" onInputChange={handleInputChange} />
              <InputField label="Phone" inputId="phone" type="text" onInputChange={handleInputChange} pattern="^\+?[0-9]+$" minLength={5} title="You can only use digits and a plus for a country code"/>
            </div>
          ) : (
    <>
        <div>
           <ul className={styles.info_cards_flex}>
             <li className={styles.info_card}>
                <h3>{selectedHotel.name}</h3>
                <span>{selectedHotel.region}</span>
             </li>
             <li className={styles.info_card}>
                <h3>Guest info</h3>
             </li>
             <li className={styles.info_card}>
                <h3>Date</h3>
                <p>{`${dayjs(checkInOutDates.checkInDate).format('DD MMM')} - ${dayjs(checkInOutDates.checkOutDate).format('DD MMM')}`}</p>
             </li>            
            </ul>
        </div>
        <div className={styles.terms}>
          <h2>Payment Terms</h2>
          <div><p>- To guarantee your booking we will ask for your credit card information</p><p>- At reservation time we will charge the entire stay</p><p>- The booking is non refundable</p><p>- This stay is 12% discount compared to a refundable stay</p>
          </div>
        </div>
        <div className={styles.payment_methods}>
            <h2>Payment methods</h2>
            <div className={styles.cell}>
                <div>
                <span>Pay with card</span>
                <ul><li><svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" fill="none"><rect width="39" height="27" x=".5" y=".5" fill="#fff" rx="5.5"></rect><path fill="#172B85" fillRule="evenodd" d="M12 18.43H9.577L7.76 11.448c-.086-.321-.27-.605-.539-.739A7.848 7.848 0 0 0 5 9.97v-.269h3.904c.538 0 .942.404 1.01.873l.943 5.036 2.422-5.909h2.355L12 18.43Zm4.98 0H14.69l1.885-8.729h2.288L16.98 18.43Zm4.846-6.31c.067-.47.471-.74.942-.74a4.238 4.238 0 0 1 2.222.403l.404-1.88a5.757 5.757 0 0 0-2.087-.403c-2.221 0-3.837 1.209-3.837 2.887 0 1.277 1.145 1.947 1.953 2.35.874.403 1.21.672 1.143 1.075 0 .604-.673.872-1.345.872-.808 0-1.617-.2-2.356-.537l-.404 1.88c.808.335 1.682.47 2.49.47 2.49.067 4.039-1.141 4.039-2.954 0-2.283-3.164-2.417-3.164-3.424Zm11.172 6.31-1.817-8.729H29.23c-.404 0-.809.27-.943.672l-3.365 8.057h2.356l.47-1.275h2.895l.269 1.275h2.087Zm-3.43-6.378.672 3.29h-1.884l1.212-3.29Z" clipRule="evenodd"></path><rect width="39" height="27" x=".5" y=".5" stroke="#E0E0E0" rx="5.5"></rect></svg></li><li><svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" fill="none"><rect width="39" height="27" x=".5" y=".5" fill="#fff" rx="5.5"></rect><path fill="#ED0006" fill-rule="evenodd" d="M20 19.517a7.266 7.266 0 0 1-4.722 1.733C11.258 21.25 8 18.004 8 14s3.258-7.25 7.278-7.25c1.802 0 3.452.653 4.723 1.733a7.266 7.266 0 0 1 4.722-1.733c4.02 0 7.278 3.246 7.278 7.25s-3.258 7.25-7.278 7.25a7.266 7.266 0 0 1-4.722-1.733Z" clipRule="evenodd"></path><path fill="#F9A000" fillRule="evenodd" d="M20 19.517A7.223 7.223 0 0 0 22.555 14 7.223 7.223 0 0 0 20 8.483a7.266 7.266 0 0 1 4.723-1.733C28.743 6.75 32 9.996 32 14s-3.259 7.25-7.278 7.25A7.266 7.266 0 0 1 20 19.517Z" clipRule="evenodd"></path><path fill="#FF5E00" fillRule="evenodd" d="M19.993 19.517a7.223 7.223 0 0 0 2.555-5.516 7.223 7.223 0 0 0-2.555-5.517 7.222 7.222 0 0 0-2.555 5.517c0 2.209.991 4.187 2.555 5.516Z" clipRule="evenodd"></path><rect width="39" height="27" x=".5" y=".5" stroke="#E0E0E0" rx="5.5"></rect></svg></li></ul>
                </div>
                <div className={styles.checkbox}></div>
            </div>
            <div className={styles.cell}>
                <div>
                <span>Pay with MobilePay</span>
                  <ul><li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" fill="none"><rect width="39" height="27" x=".5" y=".5" fill="#fff" rx="5.5"></rect><path fill="#5A78FF" d="M18.448 22.5a1.45 1.45 0 0 1-1.339-.887L12.11 9.638a1.432 1.432 0 0 1 .784-1.877l5.235-2.152a1.457 1.457 0 0 1 1.108 0c.354.146.636.426.783.777l4.998 11.976a1.432 1.432 0 0 1-.783 1.876L19 22.39c-.175.072-.363.109-.552.109Zm.235-16.227a.67.67 0 0 0-.256.05l-5.235 2.152a.665.665 0 0 0-.362.867l4.999 11.975a.67.67 0 0 0 .873.36l5.235-2.154a.659.659 0 0 0 .361-.866L19.3 6.682a.67.67 0 0 0-.617-.41Z"></path><path fill="#4A61DA" d="M23.06 14.305c-1.498.616-2.748 1.466-3.567 2.49l-2.11-5.06a8.913 8.913 0 0 1 3.566-2.488c1.497-.617 3.01-.915 4.295-.741l2.111 5.058a8.97 8.97 0 0 0-4.296.741Z"></path><path fill="#5A78FF" d="M23.747 15.846c-1.621 0-3.105.311-4.255.945v-5.114a8.97 8.97 0 0 1 4.255-.945c1.62 0 3.133.298 4.253.946v5.115a8.966 8.966 0 0 0-4.253-.947Z"></path><rect width="39" height="27" x=".5" y=".5" stroke="#E0E0E0" rx="5.5"></rect></svg>
                  </li></ul>
                </div>
                <div className={styles.checkbox}></div>
            </div>
        </div>

         <div className={styles.checkbox_flex}>
           <input type="checkbox" className={styles.checkbox} />
           <label htmlFor="checkbox">I accept Comwell's terms and conditions</label>  
         </div>
     </>
  )}
  {bookingOverviewState.content === "overview" && (
     <div className={styles.checkbox_flex}>
       <input type="checkbox" className={styles.checkbox} />
       <label htmlFor="checkbox">I am booking on behalf of someone else</label>   
    </div>
  )
    }
 
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