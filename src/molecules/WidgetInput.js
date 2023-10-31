import React from 'react'
import styles from './WindgetInput.module.css'


function WidgetInput({ inputText }) {
  return (
    <div className={styles.input_wrapper}>
       <button className={styles.input_button}>
         {inputText}<span className={styles.input_label}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" class="w-[16px] rotate-180"><path stroke="currentColor" stroke-width="1.5" d="M16.666 12.916 10 6.666l-6.667 6.25"></path></svg>
         </span>
       </button>
  </div>
  )
}

export default WidgetInput