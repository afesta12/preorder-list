import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase.js"
import { useNavigate } from "react-router-dom";

export default function Login() {

    // User email password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Register info
    const [registerInformation, setRegisterInformation] = useState({

        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
 
    })

    const [isRegistering, setIsRegistering] = useState(false);

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

    // Register
    const handleRegister = () => {

        if(registerInformation.email !== registerInformation.confirmEmail) {

            alert("Please confirm that the entered e-mail addresses match.");
            return;

        } else if(registerInformation.password !== registerInformation.confirmPassword) {

            alert("Please confirm that the entered passwords match.");
            return;

        }

        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
        .then(() => {

            navigate('/home')

        }).catch(err => alert(err.message))

    };

    // Sign in when sign in is clicked and redirect to homepage if the user exists
    const handleSignIn = () => {

        signInWithEmailAndPassword(auth, email, password).then(() => {

            navigate('/home')

        }).catch(() => alert("Invalid e-mail or password"));

    }

  return (
    <div className='container login'>

        { isRegistering ? (
            <>
                <h1 className="main-text">Sign Up</h1>
                <div className="container input register">
        
                    <input type="email" 
                        placeholder='E-mail'
                        value={registerInformation.email}
                        onChange={ (e) => setRegisterInformation({...registerInformation, email: e.target.value}) } />

                    <input type="E-mail"
                           placeholder='Confirm E-mail'
                           value={registerInformation.confirmEmail}
                           onChange={(e) => setRegisterInformation({...registerInformation, confirmEmail: e.target.value})} />

                    <input type="password" 
                        placeholder='Password'
                        value={registerInformation.password}
                        onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})} />

                    <input type="password" 
                           placeholder='Confirm Password'
                           value={registerInformation.confirmPassword}
                           onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})} />
        
                </div>

                <div className="container bottom">
        
                    <button onClick={ handleRegister }>Create Account</button>
                    <button className='register' onClick={ () => setIsRegistering(false) }>Go back</button>
                </div>

            </>
        ) : 
        
        (
            <>

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

                    <button className='register' onClick={ () => setIsRegistering(true) }>Create an account</button>
                </div>
            </>

        )}
    
    </div>
  )
}
