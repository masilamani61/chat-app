import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebas";
import { Navigate } from "react-router-dom";
import { useState } from "react";
function Login(){
  const[err,seterr]=useState(false)
    const Navigate=useNavigate()
    const handlesummit=async(e)=>{
        e.preventDefault()
        const email=e.target[0].value;
        const password=e.target[1].value;
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          Navigate('/')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterr(true)
        });

      
    }    
    return(
        <div>
             <div className="form-container">
            <div className="form-wrapper">
                <h1>Login</h1>
                <form className="form" onSubmit={handlesummit}>
                    
                    <label>email</label>
                    <input type="email"/>
                    <label>password</label>
                    <input type="password"/>
                  
                   
                      <button type="submit">Login</button>
                      <button><Link to='/signup'>register</Link></button>
                </form>
                {err && <span>email or password is incorrect</span>}
            </div>
        </div>
        </div>
    )
}

export default Login