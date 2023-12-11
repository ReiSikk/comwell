import React from 'react'
import styles from './Overlay.module.scss'
import HotelCard from '../molecules/HotelCard.js'
import { HotelsContext } from '../providers/hotels-context.js'
import { useState, useEffect, useContext } from 'react'
import GuestsAndRoomsSelector from '../organisms/GuestsAndRoomsSelector.js'
import CheckInOut from './CheckInOut'
import RoomCard from '../molecules/RoomCard.js'
import RoomDetails from '../organisms/RoomDetails.js'
import dayjs from 'dayjs'
import { useAuth } from '@/providers/AuthProvider';
import BookingOverview from './BookingOverview'
import { useSignUpData } from '../providers/SignUpDataContext';




function Overlay() {

  //Check logged in status
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();
  const {signUpData, setSignUpData} = useSignUpData();


  const [bookingOverviewState, setBookingOverviewState] = useState({
    isVisible: false,
    content: ""
  });

  const updateBookingOverviewState = (newData) => {
    setBookingOverviewState(newData);
  }



  const { overlayState, updateOverlayState, selectedHotel, updateSelectedHotel, overlayHeaders, isVisible, selecedRegion, shouldFetchRooms, fetchRoomsForSelectedHotel, setShouldFetchRooms, checkInOutDates, guestsAndRooms, selectedRoom, updateSelectedRoom }= useContext(HotelsContext);

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

      if (!Array.isArray(roomsData)) {
        return;
      }

      try {
        const HotelRoomsData = [];
        for (const roomId of roomsData) {
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


      //check if the guest info form is complete
      const [isFormComplete, setIsFormComplete] = useState(false);
      useEffect(() => {
        if (isLoggedIn) {
          console.log("user is logged in =", isLoggedIn);
          // If the user is logged in, set isFormComplete to true
          setIsFormComplete(true);
        } else {
          console.log("user is logged in =", isLoggedIn);
          // If the user is not logged in, set isFormComplete to false
          setIsFormComplete(false);
        }
      }, [user]);


      //call booking backend
      const [bookingMessage, setBookingMessage] = useState("");
      useEffect(() => {
        if (bookingMessage) {
          const timer = setTimeout(() => {
            setBookingMessage("");
          }, 3000);
      
          return () => clearTimeout(timer); // This will clear the timeout if the component unmounts before the timeout finishes
        }
      }, [bookingMessage]);
      
      const callBookingBackend = async () => {
      

        fetch('http://127.0.0.1:3005/booking', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    guest: user.fullName ? user.fullName : signUpData.fullName,
    guestEmail: user.email ? user.email : signUpData.signupEmail,
    guestPhone: user.phone ? user.phone : signUpData.phone,
    selectedHotel: selectedHotel ? selectedHotel._id : '',
    selectedRoom: selectedRoom ? selectedRoom._id : '',
    roomType: selectedRoom ? selectedRoom.roomType : '',
    roomPrice: selectedRoom ? selectedRoom.price : '',
    checkIn: checkInOutDates ? checkInOutDates.checkInDate : '',
    checkOut: checkInOutDates ? checkInOutDates.checkOutDate : '',
    user: user.username ? user.username : signUpData.signUpEmail,
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log(data, "Data from booking backend");
    if(data) {
      setBookingMessage(data.message)
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
      }


  



  
  return (
    <div className={`${styles.overlay} ${overlayState.showOverlay ? styles.show : ''}`}>
        <div className={styles.overlay_content}>
          {bookingMessage && (
            <div className={styles.booking_message}>
              <p>{bookingMessage}</p>
            </div>
            )}
        {overlayState.overlayToShow === 'Choose room' && (
            <div className={styles.overlay_top_info}>
              <button aria-label="Gå tilbage" 
              className={styles.back_icon}
              onClick={() => {
                if(!bookingOverviewState.isVisible) {
                  updateSelectedRoom(""); //reset selected room
                } else if(bookingOverviewState.isVisible && bookingOverviewState.content === "overview") {
                  setBookingOverviewState(false); //reset booking overview state
                } else if(bookingOverviewState.isVisible && bookingOverviewState.content === "payment") {
                  setBookingOverviewState({ ...bookingOverviewState, content: "overview" }); // Go back to overview
                }
              }}
              ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" ><path fill="currentColor" fillRule="evenodd" d="m7.524 9.61 5.835-5.835-.884-.884L5.81 9.557l6.638 7.523.937-.827L7.524 9.61Z" clipRule="evenodd"></path></svg></button>
                <div className={styles.guest_info}>
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#161616" d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5Zm0 16.5h-15V9h15v10.5Zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3v3Z"></path></svg>
                       <span>{checkInOutDates.checkInDate && checkInOutDates.checkOutDate ? `${dayjs(checkInOutDates.checkInDate).format('DD MMM')} - ${dayjs(checkInOutDates.checkOutDate).format('DD MMM')}` : ""}</span>
                  </div>
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#161616" d="M12.5 3a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0-1.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM20 22.5h-1.5v-3.75A3.75 3.75 0 0 0 14.75 15h-4.5a3.75 3.75 0 0 0-3.75 3.75v3.75H5v-3.75a5.25 5.25 0 0 1 5.25-5.25h4.5A5.25 5.25 0 0 1 20 18.75v3.75Z"></path><path fill="#000" d="M19 21v1.5H6V21z"></path></svg>
                      <span>
                     {guestsAndRooms.rooms === 1 ? `${guestsAndRooms.rooms} room, ` : `${guestsAndRooms.rooms} rooms, `}
                     {guestsAndRooms.adults + guestsAndRooms.kids + guestsAndRooms.infants === 1 ? "1 person" : `${guestsAndRooms.adults + guestsAndRooms.kids + guestsAndRooms.infants} persons`}
                      </span>
                  </div>
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 13.5A3.75 3.75 0 1 1 12 6a3.75 3.75 0 0 1 0 7.5zm0-6a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z"></path><path d="m12 22.5-6.327-7.462a26.911 26.911 0 0 1-.26-.338A8.167 8.167 0 0 1 3.75 9.75a8.25 8.25 0 1 1 16.5 0 8.163 8.163 0 0 1-1.661 4.948l-.001.002s-.225.296-.259.335zm-5.39-8.704s.174.231.214.281L12 20.181l5.183-6.113.209-.274A6.676 6.676 0 0 0 18.75 9.75a6.75 6.75 0 0 0-13.5 0 6.68 6.68 0 0 0 1.36 4.046z"></path></g></svg>
                      <span>{selectedHotel.name}</span>
                  </div>
                </div>
              </div>
        )}
        {!bookingOverviewState.isVisible && (
            <div className={styles.overlay_top}>
                <h2 className={styles.overlay_header}>{overlayHeaders[overlayState.overlayToShow] || ""}</h2>
                <button className={styles.close_button}  onClick={() => updateOverlayState({ showOverlay: false, isVisible: false })}>
                <svg className={styles.close_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="1.5" d="M2.62 13.38 12.99 3.01M13.38 13.38 3.01 3.01"></path></svg>
                </button>
            </div>
        )}
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
              {overlayState.overlayToShow === 'Guests & Rooms' && (
                    <GuestsAndRoomsSelector />
                   )}
              {overlayState.overlayToShow === 'Check in / Check out' && (
                  <div className={styles.check_in_out_wrapper}>
                      <CheckInOut id="checkInDate"/>
                  </div>
                   )}
           
           {overlayState.overlayToShow === 'Choose room' && hotelRoomsData && (
           selectedRoom === "" ? (
             <div className={styles.rooms_flex}>
               {hotelRoomsData
                 .filter(room => room.available)
                 .map(room => (
                   <RoomCard 
                     updateSelectedRoom={updateSelectedRoom}
                     room={room}
                     key={room._id}
                     roomType={room.roomType} 
                     roomSize={room.roomSize} 
                     roomPrice={room.price}
                     bedTypes={Array.isArray(room.bedTypes) ? room.bedTypes.join(', ') : room.bedTypes}
                     roomFacilities={room.facilities}
                   />
                 ))
               }
             </div>
            ) : (
              bookingOverviewState.isVisible ? <BookingOverview room={selectedRoom} bookingOverviewState={bookingOverviewState} isFormComplete={isFormComplete} setIsFormComplete={setIsFormComplete}/> : <RoomDetails room={selectedRoom} />
           )
         )}
            </div>
              {selectedRoom === "" ? (
                 <div className={styles.drawer_bottom}>
                 <button className={styles.drawer_lower_btn} onClick={() => updateOverlayState({ showOverlay: false, isVisible: false })}>Select</button>
               </div>
              ) : (
               null
              )}
        </div>
        {selectedRoom !== "" && (
                 <div className={styles.drawer_bottom_select_room}>
                  <span>{`${selectedRoom.price} kr.`}</span>
                  <button 
                  className={styles.drawer_lower_btn}
                  onClick={() => {
                    if(!bookingOverviewState.isVisible) {
                      updateBookingOverviewState({isVisible: true, content: "overview"})
                    } else if (bookingOverviewState.content === "overview" && isFormComplete) {
                      updateBookingOverviewState({ ...bookingOverviewState, content: "payment"})
                    } else if (bookingOverviewState.content === "payment" && isFormComplete) {
                      callBookingBackend(); // Call the function to make the booking
                    }
                  }}
                  disabled={bookingOverviewState.content === "overview" && !isFormComplete}
                  >
                     {selectedRoom !== "" && bookingOverviewState.isVisible ? 
             (bookingOverviewState.content === "overview" ? 
               (!isFormComplete ? "Complete form to continue" : "Continue") 
               : "Confirm payment")  
               : "Select"}
                    </button>
               
                 </div>
          )}
    </div>
  )
}

export default Overlay