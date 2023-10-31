import React from 'react'
import HeroBookingWidget from './HeroBookingWidget'
import styles from './HeroSection.module.css'
import Image from 'next/image'

function HeroSection() {
  return (
      <div className={styles.wrapper}>
        <div className={styles.booking_widget_layout}>
           <HeroBookingWidget />
        </div>
        <div>
            <Image src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_topheader.jpg/a1dbaeb00be6d3ed79294c38ccb1d729.webp" className={styles.image} alt="Hero image" width={1920} height={1080} />
        </div>
    </div>
  )
}

export default HeroSection