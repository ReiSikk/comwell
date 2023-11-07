import React from 'react'
import styles from './Overlay.module.css'

function Overlay({ overlayState, updateOverlayState, overlayData }) {
  return (
    <div className={`${styles.overlay} ${overlayState.showOverlay ? styles.show : ''}`}>
        <div className={styles.overlay_content}>
            <div className={styles.overlay_top}>
                <h2 className={styles.overlay_header}>{overlayState.overlayToShow}</h2>
                <button className={styles.close_button} onClick={updateOverlayState}>
                <svg className={styles.close_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="1.5" d="M2.62 13.38 12.99 3.01M13.38 13.38 3.01 3.01"></path></svg>
                </button>
            </div>
            <div className={styles.overlay_data}>
              {overlayData.currentOverlayData}
              </div>
            <div className={styles.drawer_bottom}>
              <button className={styles.drawer_lower_btn}>Select</button>
            </div>
        </div>
    </div>
  )
}

export default Overlay