import {React, useContext} from 'react'
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
  const { selectedHotel } = useContext(HotelsContext);
    console.log(selectedHotel, 'selectedhotel from dashboard');


  return (
    <div className={styles.wrapper}>
        <DashboardLeft hotelsData={hotelsData} selectedHotel={selectedHotel} />
        <DashboardRight hotelsData={hotelsData}/>
    </div>
  )
}

export default Dashboard