import '@/styles/globals.css'
import '../styles/global.scss'
import MainLayout from '@/layouts/MainLayout'
import localFont from 'next/font/local'
import { useEffect, useState } from 'react'
import React from 'react'
// Font files can be colocated inside of `pages`
const fontRegular = localFont({ src: '/fonts/Fellix-Bold-fe0f33a2.ttf' })
/* const inter = Inter({ subsets: ['latin'] }); */


async function getData() {

  const hotelsEndpoint = 'http://127.0.0.1:3005/hotels'
  const res = await fetch(hotelsEndpoint)
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default function App({ Component, pageProps }) {
  const [hotelsData, setHotelsData] = useState(null);

  useEffect(() => {
    getData().then(data => setHotelsData(data)).catch(err => console.error(err));
  }, []);

  const [overlayState, setOverlayState] = React.useState({
    overlayToShow: "",
    showOverlay: false,

  })
  const updateOverlayState = (newState) => {
    setOverlayState(newState);
  }; 

  return (
  <MainLayout className={fontRegular.className}>
   <Component {...pageProps} hotelsData={hotelsData} overlayState={overlayState} updateOverlayState={updateOverlayState} />
  </MainLayout>
  )
}
