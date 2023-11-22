import React, {useState} from 'react'
import { useAuth } from '@/providers/AuthProvider';


function fourohfour() {

  //TO FIND OUT IF THE USER IS LOGGED IN
    const { isLoggedIn } = useAuth();

  return (
    <div>
      <h1>404 baby</h1>
        <p>feature under construction</p>
        </div>
        
  )
  
}

export default fourohfour