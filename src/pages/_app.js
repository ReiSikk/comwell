
import '@/styles/globals.scss'
import '../styles/variables.scss'
import { HotelsContext } from '../providers/hotels-context.js'

import MainLayout from '@/layouts/MainLayout'
import localFont from 'next/font/local'
import { useEffect, useState, useRef } from 'react'
import React from 'react'
import { AuthProvider } from '@/atoms/AuthProvider'
//date picker imports
import dayjs from 'dayjs'
// Use the plugin
// Font files can be colocated inside of `pages`
const fontRegular = localFont({ src: '/fonts/Fellix-Bold-fe0f33a2.ttf' })



export default function App({ Component, pageProps }) {

  // init state variables
  const [overlayState, setOverlayState] = React.useState({
    overlayToShow: "",
    showOverlay: false,
    isVisible: false

  })
  const [selectedHotel, setSelectedHotel] = React.useState({
    selectedHotel: "",
  })

  const [shouldFetchRooms, setShouldFetchRooms] = useState(false);

  const fetchRoomsForSelectedHotel = () => {
  setShouldFetchRooms(true);
};




  //update handle overlay state and displayed headers in it 
  const overlayHeaders = {
    "Choose hotel": "Hotels",
    "Choose room": "Guests & Rooms",
    "Check in / Check out": "Dates"
  };



//makes it possible to use the timerRef.current in the useEffect hook
const timerRef = useRef();
  
useEffect(() => {
  setOverlayState(prevState => ({ ...prevState, isVisible: false }));
  timerRef.current = setTimeout(() => {
    setOverlayState(prevState => ({ ...prevState, isVisible: true }));
  }, 250);

  return () => 
    clearTimeout(timerRef.current); // Clean up the timeout on unmount
}, [overlayState.overlayToShow]);


const updateOverlayState = (newState) => {

  clearTimeout(timerRef.current); 

  setOverlayState(prevState => {
    const updatedState = {
      ...prevState,
      ...newState,
      isVisible: newState.showOverlay !== undefined ? newState.showOverlay : prevState.isVisible,
    };

    return updatedState;
  });
};


  const updateSelectedHotel = (newData) => {
    setSelectedHotel(newData);
  }


  //Guests and rooms 
  const [guestsAndRooms, setGuestsAndRooms] = useState({
    rooms: 1,
    adults: 1,
    kids: 0,
    infants: 0
 });

 const handleInputChange = (id, value) => {
    setGuestsAndRooms(prevState => ({ ...prevState, [id]: value }));
  };

  //Check in/out dates
const [checkInOutDates, setCheckInOutDates] = useState({
  checkInDate: dayjs().format('YYYY-MM-DD'), // set checkInDate as today
  checkOutDate: dayjs().add(1, 'day').format('YYYY-MM-DD')
})


const handleCheckInOutChange = (id, value) => {
  let formattedValue = dayjs(value).format('YYYY-MM-DD');
  console.log(formattedValue, formattedValue, id)

  // Update the state with the new check-in or check-out date
  setCheckInOutDates(prevState => ({ ...prevState, [id]: formattedValue }));
}

  const hotelsContextValue = {
    overlayState,
    updateOverlayState,
    selectedHotel,
    updateSelectedHotel,
    overlayHeaders,
    guestsAndRooms,
    handleInputChange,
    checkInOutDates,
    handleCheckInOutChange,
    shouldFetchRooms,
    setShouldFetchRooms,
    fetchRoomsForSelectedHotel
  };


  return (
<AuthProvider>
  <MainLayout className={fontRegular.className}>
    <HotelsContext.Provider value={hotelsContextValue}>
   <Component {...pageProps} />
   </HotelsContext.Provider>
  </MainLayout>
  </AuthProvider>
  )
}
