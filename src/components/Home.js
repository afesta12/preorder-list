import React, { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase"
import { useNavigate } from "react-router-dom"
import { uid } from "uid"
import { set, ref, onValue } from "firebase/database"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons'

export default function Home() {

    // Nav
    const navigate = useNavigate();

    // Order
    const [order, setOrder] = useState("");

    // Orders
    const [orders, setOrders] = useState([]);

    // Keep user from going to homepage when not logged in
    useEffect(() => {

        auth.onAuthStateChanged(user => {

            if(user) {

                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {

                    setOrders([]);
                    const data = snapshot.val();

                    if(data !== null) {

                        Object.values(data).map(order => {

                            setOrders((old) => [...old, order])

                        })

                    }

                })

            }

            // Redirect to login
            else if(!user) navigate('/')

        })

    }, [])

    // Sign out -> redirect to home
    const handleSignOut = () => {

        signOut(auth).then(() => {

            navigate('/');

        }).catch(error => {alert(error.message)});


    }

    // Add order to user's orders DB
    const writeToDatabase = () => {

        const uidd = uid();

        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {

            order: order,
            uidd: uidd

        })

        setOrder("");

    }

  return (
    <div className='container home'>
    
        <div className="container home-input">
        
            <div className="text">
            
                <h5>Preorder name:</h5>
                <input type="text" 
                       placeholder='Add order...'
                       value={order}
                       onChange={(e) => setOrder(e.target.value)} />

            </div>

            <div className="buttons">
            
                <button onClick={ writeToDatabase } >Add to List</button>
                <button onClick={ handleSignOut } >Sign Out</button>
            
            </div>
        </div>

        <div className="container orders">

            <div className="order-top">
            
                <h5>Your Preorders</h5>
            
            </div>

            <div className="order-list">
            
                {

                    orders.map(order => (

                        <div className="order">
                        
                            <p>{order.order}</p>

                            <div className="icons">
                            
                                <FontAwesomeIcon icon={faXmark} color="#45A29E" className='icon' />
                                <FontAwesomeIcon icon={ faPen } color="#45A29E" size='xs' className='icon' />
                            
                            </div>
                        
                        </div>

                    ))

                }
            
            </div>
        
        
        </div>
    
    </div>
  )
}
