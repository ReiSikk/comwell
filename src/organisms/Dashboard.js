import {React, useState} from 'react'
import styles from './Dashboard.module.scss'
import DashboardLeft from '../molecules/DashboardLeft'
import DashboardRight from '../molecules/DashboardRight'
import { useAuth } from '../providers/AuthProvider'
import { HotelsContext } from '../providers/hotels-context'

function Dashboard({ hotelsData}) {
    console.log(hotelsData, 'from dashboard');
//Check logged in status
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();

// State for selected hotel in dashboard
const [hotelToManage, setHotelToManage] = useState(null);
const updateSelectedHotel = (hotel) => {
    setHotelToManage(hotel);
  };



  return (
    <div className={styles.wrapper}>
        <DashboardLeft hotelsData={hotelsData} hotelToManage={hotelToManage} updateSelectedHotel={updateSelectedHotel}  />
        <DashboardRight hotelsData={hotelsData}/>
    </div>
  )
}

export default Dashboard