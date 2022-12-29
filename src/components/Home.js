import React, { useEffect } from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

export default function Home() {

    // Nav
    const navigate = useNavigate();

    // Keep user from going to homepage when not logged in
    useEffect(() => {

        auth.onAuthStateChanged(user => {

            // Redirect to login
            if(!user) navigate('/')

        })

    }, [])

    // Sign out -> redirect to home
    const handleSignOut = () => {

        signOut(auth).then(() => {

            navigate('/');

        }).catch(error => {alert(error.message)});


    }

  return (
    <div className='container home'>
    
        <div className="container home-input">
        
            <div className="text">
            
                <h5>Preorder name:</h5>
                <input type="text" placeholder='Add order...' />

            </div>

            <div className="buttons">
            
                <button>Add to List</button>
                <button onClick={ handleSignOut } >Sign Out</button>
            
            </div>
        </div>

        <div className="container orders">

            <div className="order-top">
            
                <h5>Your Preorders</h5>
            
            </div>

            <div className="order-list"></div>
        
        
        </div>
    
    </div>
  )
}
