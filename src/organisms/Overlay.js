import React from 'react'
import styles from './Overlay.module.scss'
import HotelCard from '../molecules/HotelCard'
import { useState, useEffect } from 'react'

function Overlay({ overlayState, updateOverlayState, hotelsData, updateSelectedHotel, selectedHotel  }) {

  const overlayHeaders = {
    "Choose hotel": "Hotels",
    "Choose room": "Guests & Rooms",
    "Check in / Check out": "Dates"
  };

 const [selectedRegion, setSelectedRegion] = React.useState("All")
  const handleLabelClick = (e) => {
    setSelectedRegion(e.target.id);
    //add class .selected to the clicked button and remove it from the others
  }


  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 250); // Delay showing the overlay to give the animation time to finish
    
    return () => 
      clearTimeout(timer); // Clean up the timeout on unmount
  }, [overlayState.overlayToShow, hotelsData, selectedRegion]);

  return (
    <div className={`${styles.overlay} ${overlayState.showOverlay ? styles.show : ''}`}>
        <div className={styles.overlay_content}>
            <div className={styles.overlay_top}>
                <h2 className={styles.overlay_header}>{overlayHeaders[overlayState.overlayToShow] || ""}</h2>
                <button className={styles.close_button} onClick={updateOverlayState}>
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
            <div className={`${styles.overlay_data} ${isVisible ? styles.visible : ''}`}>
            {overlayState.overlayToShow === 'Choose hotel' && hotelsData && hotelsData
              .filter(hotel => selectedRegion === 'All' || hotel.region === selectedRegion)
              .map(hotel => ( <HotelCard 
                hotel={hotel} key={hotel._id} 
                selectedHotel={selectedHotel}
                updateSelectedHotel={updateSelectedHotel} 
                /> 
           ))}
            </div>
            <div className={styles.drawer_bottom}>
              <button className={styles.drawer_lower_btn}>Select</button>
            </div>
        </div>
    </div>
  )
}

export default Overlay