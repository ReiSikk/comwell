import React from 'react'

function GuestsAndRoomsSelector() {
  return (
    <div>
        <div className={styles.gr_selector}>
          <div className={styles.gr_upper}>
            <span>Room 1</span>
          </div>
          <div className={styles.gr_lower}>
            <div className={styles.gr_input_cell}>
                <span>Adults</span>
                <div>
                    <button aria-label="Decrease amount"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="2" fill="none"><path fill="currentColor" fillRule="evenodd" d="M15.556 1.667H.445V.333h15.11v1.334Z" clipRule="evenodd"></path></svg>
                    </button>
                    <div ><input min="1" max="10" type="number" name="1"></input>
                    </div>
                    <button aria-label="Increase amount"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokWidth="1.5" d="M12 3.5v17M3.5 12h17"></path></svg>
                    </button>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default GuestsAndRoomsSelector