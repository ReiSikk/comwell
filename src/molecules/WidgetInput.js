import React from 'react'
import styles from './WindgetInput.module.css'
import { HotelsContext } from '../providers/hotels-context.js'
import { useContext } from 'react'

function WidgetInput({ inputText }) {

  const { updateOverlayState, overlayState }= useContext(HotelsContext);


  return (
 <div className={styles.input_wrapper} onClick={() => updateOverlayState({ ...overlayState,  overlayToShow: inputText, showOverlay: !overlayState.showOverlay })} >
       <button className={styles.input_button}>
         {inputText}<span className={styles.input_label}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M16.666 12.916 10 6.666l-6.667 6.25"></path></svg>
         </span>
       </button>
  </div>
  )
}

export default WidgetInput