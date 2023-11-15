
import '@/styles/globals.scss'
import '../styles/variables.scss'
import { HotelsContext } from '../providers/hotels-context.js'

import MainLayout from '@/layouts/MainLayout'
import localFont from 'next/font/local'
import { useEffect, useState, useRef } from 'react'
import React from 'react'
// Font files can be colocated inside of `pages`
const fontRegular = localFont({ src: '/fonts/Fellix-Bold-fe0f33a2.ttf' })



 async function getData() {

  const hotelsEndpoint = 'http://127.0.0.1:3005/hotels'
  const res =  await fetch(hotelsEndpoint)
 
  if (!res.ok) {
    //TODO:handle error by showing a message to the user
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default function App({ Component, pageProps }) {

  // init state variables
  const [hotelsData, setHotelsData] = useState(null);
  const [overlayState, setOverlayState] = React.useState({
    overlayToShow: "",
    showOverlay: false,
    isVisible: false

  })
  const [selectedHotel, setSelectedHotel] = React.useState({
    selectedHotel: "",
  })

  useEffect(() => {
    getData().then(data => setHotelsData(data)).catch(err => console.error(err));
  }, []);



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
}, [overlayState.overlayToShow, hotelsData]);


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

  const hotelsContextValue = {
    hotelsData,
    setHotelsData,
    overlayState,
    updateOverlayState,
    selectedHotel,
    updateSelectedHotel,
    overlayHeaders,
  };


  return (
  <MainLayout className={fontRegular.className}>
    <HotelsContext.Provider value={hotelsContextValue}>
   <Component {...pageProps} />
   </HotelsContext.Provider>
  </MainLayout>
  )
}
