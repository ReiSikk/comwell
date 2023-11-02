import React from 'react'
import styles from './Overlay.module.css'

function Overlay({ overlayState }) {
  return (
    <div className={`${styles.overlay} ${overlayState.showOverlay ? styles.show : ''}`}>
        <div className={styles.overlay_content}>

        </div>
        </div>
  )
}

export default Overlay