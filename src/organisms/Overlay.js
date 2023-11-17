import React from 'react'
import styles from './Overlay.module.scss'
import HotelCard from '../molecules/HotelCard.js'
import { HotelsContext } from '../providers/hotels-context.js'
import { useState, useEffect, useContext } from 'react'
import GuestsAndRoomsSelector from '../organisms/GuestsAndRoomsSelector.js'
import CheckInOut from './CheckInOut'



function Overlay() {

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:3005/hotels');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setHotelsData(data);
        console.log("fetching data");
      } catch (error) {
        console.error(error);
      }
    };
  
    getData();
  }, []); 


  const [hotelsData, setHotelsData] = useState(null);
  const [selectedRegion, setSelectedRegion] = React.useState("All")
  const handleLabelClick = (e) => {
    setSelectedRegion(e.target.id);
    //add class .selected to the clicked button and remove it from the others
  }
  
  const { overlayState, updateOverlayState, selectedHotel, updateSelectedHotel, overlayHeaders, isVisible, selecedRegion }= useContext(HotelsContext);

  return (
    <div className={`${styles.overlay} ${overlayState.showOverlay ? styles.show : ''}`}>
        <div className={styles.overlay_content}>
            <div className={styles.overlay_top}>
                <h2 className={styles.overlay_header}>{overlayHeaders[overlayState.overlayToShow] || ""}</h2>
                <button className={styles.close_button}  onClick={() => updateOverlayState({ showOverlay: false, isVisible: false })}>
                <svg className={styles.close_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="1.5" d="M2.62 13.38 12.99 3.01M13.38 13.38 3.01 3.01"></path></svg>
                </button>
            </div>
               <div className={styles.label_flex}>
                  {overlayState.overlayToShow === 'Choose hotel' && (
                    <>
                   <button id='All' className={selectedRegion === 'All' ? styles.selected : ''} onClick={handleLabelClick}>All</button>
                   <button id='Zealand' className={selectedRegion === 'Zealand' ? styles.selected : ''} onClick={handleLabelClick}>Zealand</button>
                   <button id='Funen' className={selectedRegion === 'Funen' ? styles.selected : ''} onClick={handleLabelClick}>Funen</button>
                  <button id='Jutland' className={selectedRegion === 'Jutland' ? styles.selected : ''} onClick={handleLabelClick}>Jutland</button>
                    </>
                  )
                   }
                </div>
            <div className={`${styles.overlay_data} ${overlayState.isVisible ? styles.visible : ''}`}>
            {overlayState.overlayToShow === 'Choose hotel' && hotelsData && hotelsData
              .filter(hotel => selectedRegion === 'All' || hotel.region === selectedRegion)
              .map(hotel => ( <HotelCard 
                hotel={hotel} key={hotel._id} 
                selectedHotel={selectedHotel}
                updateSelectedHotel={updateSelectedHotel} 
                /> 
           ))}
              {overlayState.overlayToShow === 'Choose room' && (
                    <GuestsAndRoomsSelector />
                   )}
              {overlayState.overlayToShow === 'Check in / Check out' && (
                  <div className={styles.check_in_out_wrapper}>
                      <CheckInOut id="checkInDate"/>
                     {/*  <CheckInOut id="checkOutDate" /> */}
                  </div>
                   )}
            
            </div>
            <div className={styles.drawer_bottom}>
              <button className={styles.drawer_lower_btn} onClick={() => updateOverlayState({ showOverlay: false, isVisible: false })}>Select</button>
            </div>
        </div>
    </div>
  )
}

export default Overlay