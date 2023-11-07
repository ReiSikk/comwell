import React from 'react'
import HeroBookingWidget from './HeroBookingWidget'
import styles from './HeroSection.module.css'
import Image from 'next/image'
import Overlay from './Overlay'

function HeroSection() {

  const [overlayState, setOverlayState] = React.useState({
    overlayToShow: "",
    showOverlay: false,

  })
  const updateOverlayState = (newState) => {
    setOverlayState(newState);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.booking_widget_layout}>
           <HeroBookingWidget overlayState={overlayState} updateOverlayState={updateOverlayState} />
        </div>
        <div>
            <Image src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_topheader.jpg/a1dbaeb00be6d3ed79294c38ccb1d729.webp" className={styles.image} alt="Hero image" width={1920} height={1080} />
        </div>
    </div>
    </>
  )
}

export default HeroSection