import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase.js"
import { useNavigate } from "react-router-dom";

export default function Login() {

    // User email password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // User persistence
    useEffect(() => {

        auth.onAuthStateChanged((user) => {

            if(user) {

                navigate("/home");

            }

        });

    }, [])


    const handleEmailChange = (e) => {

        setEmail(e.target.value);

    };

    const handlePasswordChange = (e) => {

        setPassword(e.target.value);

    }

    // Sign in when sign in is clicked and redirect to homepage if the user exists
    const handleSignIn = () => {

        signInWithEmailAndPassword(auth, email, password).then(() => {

            navigate('/home')

        }).catch(() => alert("Invalid e-mail or password"));

    }

  return (
    <div className='container login'>

        <h1 className="main-text">Preorder List</h1>

        <div className="container input">
        
            <input type="email" 
                   placeholder='E-mail'
                   value={email}
                   onChange={ handleEmailChange } />

            <input type="password" 
                   placeholder='Password'
                   value={password}
                   onChange={ handlePasswordChange } />
            
            </div>

            <div className="container bottom">
            
                <button onClick={ handleSignIn }>Sign In</button>

                <a href="">Create an account</a>
        </div>
    
    </div>
  )
}
