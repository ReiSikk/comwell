import {React, useState, useEffect } from 'react'
import styles from './Dashboard.module.scss'
import DashboardLeft from '../molecules/DashboardLeft'
import DashboardRight from '../molecules/DashboardRight'
import { useAuth } from '../providers/AuthProvider'
import { HotelsContext } from '../providers/hotels-context'

function Dashboard({ hotelsData}) {
//Check logged in status
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();

// State for selected hotel in dashboard
const [hotelToManage, setHotelToManage] = useState(null);
const updateSelectedHotel = (hotel) => {
    setHotelToManage(hotel);
};


// State for rooms of the selected hotel
const [hotelRooms, setHotelRooms] = useState(null);

// Update hotelRooms when hotelToManage changes
useEffect(() => {
    if (hotelToManage) {
      setHotelRooms(hotelToManage.rooms);
    }
  }, [hotelToManage]);

//fetch rooms data from rooms collection
const [selectedHotelRoomsData, setSelectedHotelRoomsData] = useState(null);
useEffect(() => {
    const fetchHotelRoomsData = async () => {

      try {
        const HotelRoomsData = [];
        for (const roomId of hotelRooms) {
          const response = await fetch(`http://127.0.0.1:3005/rooms/${roomId}`);
          if (!response.ok) {
            console.error(`Error fetching room ${response.url}: ${response.statusText}`);
            continue;
          }
          if (response.headers.get('Content-Length') === '0') {
            console.error(`No content in response for room ${response.url}`);
            continue;
          }
          const roomData = await response.json();
          HotelRoomsData.push(roomData);
        }
        setSelectedHotelRoomsData(HotelRoomsData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchHotelRoomsData();
  }, [hotelRooms]);





  return (
    <div className={styles.wrapper}>
        <DashboardLeft hotelsData={hotelsData} hotelToManage={hotelToManage} updateSelectedHotel={updateSelectedHotel}  />
        <DashboardRight hotelsData={hotelsData} hotelToManage={hotelToManage} selectedHotelRoomsData={selectedHotelRoomsData}/>
    </div>
  )
}

export default Dashboard