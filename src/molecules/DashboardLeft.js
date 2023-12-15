import { React, useState } from 'react'
import styles from '../organisms/Dashboard.module.scss'
import HotelCard from './HotelCard'


function DashboardLeft({ hotelsData, hotelToManage ,updateSelectedHotel }) {
    console.log(hotelToManage, 'hotelToManage');
    const [region, setRegion] = useState('All');
    const handleLabelClick = (e) => {
        setRegion(e.target.id);
        //add class .selected to the clicked button and remove it from the others
      }

  return (
    <div className={styles.dash_left}>
        <div className={styles.top}>
            <h3>Hotels</h3>
            <div className={styles.label_flex}>
                   <button id='All' className={region === 'All' ? styles.selected : ''} onClick={handleLabelClick}>All</button>
                   <button id='Zealand' className={region === 'Zealand' ? styles.selected : ''} onClick={handleLabelClick}>Zealand</button>
                   <button id='Funen' className={region === 'Funen' ? styles.selected : ''} onClick={handleLabelClick}>Funen</button>
                  <button id='Jutland' className={region === 'Jutland' ? styles.selected : ''} onClick={handleLabelClick}>Jutland</button>
                </div>
        </div>
        <div className={styles.dash_left__hotels}>
        {hotelsData && hotelsData
         .filter(hotel => region === 'All' || hotel.region === region)
         .map(hotel => {

            return (
              <HotelCard 
                 hotel={hotel} 
                 key={hotel._id} 
                 updateSelectedHotel={updateSelectedHotel}
                 hotelToManage={hotelToManage}
               /> 
             );
           })
          }
        </div>
    </div>
  )
}

export default DashboardLeft