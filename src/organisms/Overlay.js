import React from 'react'
import styles from './Overlay.module.scss'
import HotelCard from '../molecules/HotelCard.js'
import { HotelsContext } from '../providers/hotels-context.js'
import { useState, useEffect, useContext } from 'react'
import GuestsAndRoomsSelector from '../organisms/GuestsAndRoomsSelector.js'
import CheckInOut from './CheckInOut'
import RoomCard from '../molecules/RoomCard.js'


function Overlay() {

  const { overlayState, updateOverlayState, selectedHotel, updateSelectedHotel, overlayHeaders, isVisible, selecedRegion, shouldFetchRooms, fetchRoomsForSelectedHotel, setShouldFetchRooms }= useContext(HotelsContext);

  //init state variables
  const [roomsData, setRoomsData] = useState(null);
  const [hotelsData, setHotelsData] = useState(null);
  const [hotelRoomsData, setHotelRoomsData] = useState(null);




  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:3005/hotels');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setHotelsData(data);
        console.log("fetching data");
      } catch (error) {
        console.error(error);
      }
    };
  
    getData();
  }, []); 

  //fetch rooms
  let hotelID = selectedHotel._id
  useEffect(() => {
    if (shouldFetchRooms) {
      // Fetch rooms for selectedHotel
      const fetchRooms = async () => {
        try {
          const res = await fetch(`http://127.0.0.1:3005/hotels/${hotelID}/rooms`);
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await res.json();
          setRoomsData(data.rooms);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchRooms();
      // After fetching, set shouldFetchRooms back to false
      setShouldFetchRooms(false);
    }
  }, [shouldFetchRooms]);


//fetch rooms data from rooms collection
  useEffect(() => {
    const fetchHotelRoomsData = async () => {
      try {
        const HotelRoomsData = [];
        for (const roomId of roomsData) {
          const response = await fetch(`http://127.0.0.1:3005/rooms/${roomId}`);
          if (!response.ok) {
            console.error(`Error fetching room ${response.url}: ${response.statusText}`);
            continue;
          }
          const roomData = await response.json();
          HotelRoomsData.push(roomData);
        }
        setHotelRoomsData(HotelRoomsData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchHotelRoomsData();
  }, [roomsData]);



  const [selectedRegion, setSelectedRegion] = React.useState("All")
  const handleLabelClick = (e) => {
    setSelectedRegion(e.target.id);
    //add class .selected to the clicked button and remove it from the others
  }

  console.log(hotelRoomsData);
  
  return (
    <div className={`${styles.overlay} ${overlayState.showOverlay ? styles.show : ''}`}>
        <div className={styles.overlay_content}>
            <div className={styles.overlay_top}>
                <h2 className={styles.overlay_header}>{overlayHeaders[overlayState.overlayToShow] || ""}</h2>
                <button className={styles.close_button}  onClick={() => updateOverlayState({ showOverlay: false, isVisible: false })}>
                <svg className={styles.close_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="1.5" d="M2.62 13.38 12.99 3.01M13.38 13.38 3.01 3.01"></path></svg>
                </button>
            </div>
               <div className={styles.label_flex}>
                  {overlayState.overlayToShow === 'Choose hotel' && (
                    <>
                   <button id='All' className={selectedRegion === 'All' ? styles.selected : ''} onClick={handleLabelClick}>All</button>
                   <button id='Zealand' className={selectedRegion === 'Zealand' ? styles.selected : ''} onClick={handleLabelClick}>Zealand</button>
                   <button id='Funen' className={selectedRegion === 'Funen' ? styles.selected : ''} onClick={handleLabelClick}>Funen</button>
                  <button id='Jutland' className={selectedRegion === 'Jutland' ? styles.selected : ''} onClick={handleLabelClick}>Jutland</button>
                    </>
                  )
                   }
                </div>
            <div className={`${styles.overlay_data} ${overlayState.isVisible ? styles.visible : ''}`}>
            {overlayState.overlayToShow === 'Choose hotel' && hotelsData && hotelsData
              .filter(hotel => selectedRegion === 'All' || hotel.region === selectedRegion)
              .map(hotel => ( <HotelCard 
                hotel={hotel} key={hotel._id} 
                selectedHotel={selectedHotel}
                updateSelectedHotel={updateSelectedHotel} 
                /> 
           ))}
              {overlayState.overlayToShow === 'Choose room' && (
                    <GuestsAndRoomsSelector />
                   )}
              {overlayState.overlayToShow === 'Check in / Check out' && (
                  <div className={styles.check_in_out_wrapper}>
                      <CheckInOut id="checkInDate"/>
                  </div>
                   )}
           
           {overlayState.overlayToShow === 'Rooms' && hotelRoomsData && (
               <div className={styles.rooms_flex}>
                 {hotelRoomsData
                   .filter(room => room.available)
                   .map(room => (
                    <RoomCard 
                    key={room._id}
                    roomType={room.roomType} 
                    roomSize={room.roomSize} 
                    bedTypes={Array.isArray(room.bedTypes) ? room.bedTypes.join(', ') : room.bedTypes}
                    roomFacilities={room.facilities}
                    />
                   ))}
               </div>
              )}
            
            </div>
            <div className={styles.drawer_bottom}>
              <button className={styles.drawer_lower_btn} onClick={() => updateOverlayState({ showOverlay: false, isVisible: false })}>Select</button>
            </div>
        </div>
    </div>
  )
}

export default Overlay