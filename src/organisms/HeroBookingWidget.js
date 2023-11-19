import React, { useContext } from 'react'
import styles from './HeroBookingWidget.module.scss'
import WidgetInput from '../molecules/WidgetInput'
import { HotelsContext } from '../providers/hotels-context.js'
import dayjs from 'dayjs'


function HeroBookingWidget() {
  const { overlayState, updateOverlayState, selectedHotel, hotelsData, guestsAndRooms, checkInOutDates, fetchRoomsForSelectedHotel }= useContext(HotelsContext);

  return (
    <>
    <div className={styles.booking_widget} >
       <div className={styles.widget_flex}>
         <h1 className={styles.h1}>Check in at Comwell and discover Denmark</h1>
         <div className={styles.widget_inner}>
          <div className={styles.inner_upper}>
           <label className={styles.label}>Accomodation</label>
          </div>
          <div className={styles.inner_lower}>
            <div className={styles.inputs_container}>
             <WidgetInput inputText={ selectedHotel && selectedHotel.name ? selectedHotel.name : "Choose hotel"} overlayID={"Choose hotel"}  />
             <WidgetInput inputText={guestsAndRooms.adults + guestsAndRooms.kids + guestsAndRooms.infants + " " + "Persons"} overlayID={"Choose room"} />
             <WidgetInput 
             inputText={checkInOutDates.checkInDate && checkInOutDates.checkOutDate ? `${dayjs(checkInOutDates.checkInDate).format('DD MMM')} / ${dayjs(checkInOutDates.checkOutDate).format('DD MMM')}` : "Check in / Check out"}  
             overlayID={"Check in / Check out"} />
            </div>
            <div className={styles.button_wrapper}>
             <div className={styles.button_container}>
               <button className={styles.button_search} onClick={fetchRoomsForSelectedHotel}><span>
                 <span className={styles.button_search_text}>Search Rooms</span>
                 <svg data-v-f36cb2b1="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" stroke="currentColor" strokeWidth=".5" d="M10.724 10A5.428 5.428 0 0 0 12 6.5 5.5 5.5 0 1 0 6.5 12c1.28 0 2.52-.451 3.5-1.276l3.793 3.776.707-.707L10.724 10ZM6.5 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"></path></svg>
               </span>
               </button>
             </div>
     
            </div>
           </div>
         </div>
         </div>
       </div>


    </>
  )
}

export default HeroBookingWidget