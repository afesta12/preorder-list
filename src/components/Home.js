import React, { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase"
import { useNavigate } from "react-router-dom"
import { uid } from "uid"
import { set, ref, onValue, remove, update } from "firebase/database"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons'
import { ScaleText } from 'react-scale-text'

export default function Home() {

    // Nav
    const navigate = useNavigate();

    // Order
    const [order, setOrder] = useState("");

    // Orders
    const [orders, setOrders] = useState([]);

    // Edit order usestate
    const [isEdit, setIsEdit] = useState(false);

    const [tempUidd, setTempUidd] = useState("");

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

        let s = order;
        s.trim();

        if(s.length === 0) {

            alert("No empty orders can be added.");
            return;

        }

        setOrder(s);

        const uidd = uid();

        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {

            order: order,
            uidd: uidd

        })

        setOrder("");
    }

    // Delete from db
    const handleDelete = (uid) => {

        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
        setIsEdit(false);
        setOrder("");

    }

    // Update order information
    const handleUpdate = (order) => {

        // Change state to editing
        setIsEdit(true);

        // Add order information to the input box
        setOrder(order.order);

        // Set temp uid for the order being updated
        setTempUidd(order.uidd);

    }

    const handleConfirmEdit = () => {

        const s = order;

        if(s.length === 0) {

            alert("No empty orders can be added.");
            return;

        }

        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {

            order: order,
            tempUidd, tempUidd,

        });

        // Reset order input box
        setOrder("");
        setIsEdit(false);

    }

  return (
    <div className='container home'>
    
        <div className="container home-input">
        
            <div className="text">
            
                <h5>Preorder name:</h5>
                <input type="text" 
                       placeholder='Add order...'
                       maxLength={120}
                       value={order}
                       onChange={(e) => setOrder(e.target.value)} />

            </div>

            <div className="buttons">
            
                {
                    isEdit ? (
                        <button onClick={ handleConfirmEdit } >Update</button>
                    ) : (

                        <button onClick={ writeToDatabase } >Add to List</button>

                    )
                }
                
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
                        
                            <div className="order-box">
                            
                                <p className='order-text' style={ { fontSize: order.order.length > 20 ? '.75rem' : '1rem' } } >{order.order}</p>

                                <div className="icons">

                                    <FontAwesomeIcon onClick={() => handleDelete(order.uidd)} 
                                                    icon={faXmark} 
                                                    color="#45A29E" 
                                                    className='icon' />

                                    <FontAwesomeIcon icon={ faPen } 
                                                    color="#45A29E" 
                                                    size='xs' 
                                                    className='icon'
                                                    onClick={() => handleUpdate(order) } />

                                </div>
                            
                            </div>
                        
                        </div>

                    ))

                }
            
            </div>
        
        </div>
    
    </div>
  )
}
