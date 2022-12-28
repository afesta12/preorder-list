import React from 'react'

export default function Login() {
  return (
    <div className='container'>

        <h1 className="main-text">Preorder List</h1>

        <div className="container">
        
            <input type="email" placeholder='E-mail' />
            <input type="password" placeholder='Password' />
        
            <div className="container">
            
                <button>Sign In</button>

                <a href="">Create an account</a>
            
            </div>
        </div>
    
    </div>
  )
}
