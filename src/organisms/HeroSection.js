import React from 'react'
import { useEffect, useContext } from 'react'
import { HotelsContext } from '../providers/hotels-context.js'
import HeroBookingWidget from './HeroBookingWidget'
import styles from './HeroSection.module.scss'
import Image from 'next/image'
import Overlay from './Overlay'
import Dashboard from './Dashboard.js'

function HeroSection() {


  const { overlayState, updateOverlayState, selectedHotel, hotelsData, isVisible, updateSelectedHote, overlayHeaders, selectedRegion, updateSelectedHotel }= useContext(HotelsContext);


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.booking_widget_layout}>
           <HeroBookingWidget overlayState={overlayState} updateOverlayState={updateOverlayState} hotelsData={hotelsData} selectedHotel={selectedHotel}/>
        </div>
        <div>
            <Image src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_topheader.jpg/a1dbaeb00be6d3ed79294c38ccb1d729.webp" className={styles.image} alt="Hero image" width={1920} height={1080} />
        </div>
        <Dashboard />
       <Overlay  />
       <div 
         className={`${overlayState.showOverlay && overlayState.isVisible ? styles.overlay_background : ''}`} 
         onClick={() => updateOverlayState({ showOverlay: false, isVisible: false })}
       ></div>
    </div>
    </>
  )

}

export default HeroSection