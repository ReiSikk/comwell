import React from 'react'
import styles from './IncrementInput.module.scss'
import { useState } from 'react'

function IncrementInput({inputData, id, onInputChange, guestsAndRooms}) {

        //if the input is adults, the initial value is 1, otherwise it's 0
    const initialValue = id === 'adults' ? 1 : 0;
    const [inputValue, setInputValue] = useState(initialValue);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onInputChange(id, event.target.value);
      };

      const increaseValue = () => {
        const newValue = Math.min(inputValue + 1, 10);
        setInputValue(newValue);
        onInputChange(id, newValue);
      };
    
      const decreaseValue = () => {
        //if the input is adults, the minimum value is 1, otherwise it's 0
        const min = id === 'adults' ? 1 : 0;
        const newValue = Math.max(inputValue - 1, min);
        setInputValue(newValue);
        onInputChange(id, newValue);
      };

  return (
    <div className={styles.increment_input}>
    <button aria-label="Decrease amount" onClick={decreaseValue}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="2" fill="none"><path fill="currentColor" fillRule="evenodd" d="M15.556 1.667H.445V.333h15.11v1.334Z" clipRule="evenodd"></path></svg>
    </button>
    <div ><input id={id} min="1" max="10" type="number" name="1"  value={
      guestsAndRooms.adults === 1 && guestsAndRooms.kids === 0 && guestsAndRooms.infants === 0 
        ? initialValue 
        : guestsAndRooms[id]
    }  onChange={handleInputChange}></input>
    </div>
    <button aria-label="Increase amount" onClick={increaseValue}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" strokeWidth="1.5" d="M12 3.5v17M3.5 12h17"></path></svg>
    </button>
</div>
  )
}

export default IncrementInput