import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth,db,storage } from "../firebas";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; 


import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";

function Signup(){
  
const[err,seterr]=useState(false)
const Navigate=useNavigate()
const handlesummit=async(e)=>{
    e.preventDefault()
    const username=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
    console.log(email,password)
    
  
try{
const res=await createUserWithEmailAndPassword(auth, email, password)


const storageRef = ref(storage, username);



const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      updateProfile(auth.currentUser, {
        displayName: username, photoURL: downloadURL,email

      }).then(() => {
        // Profile updated!
        console.log('profile updated')
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
      await setDoc(doc(db, "users", res.user.uid), {
        displayname:username,
        photourl:downloadURL,
        email,
        uid:res.user.uid
      });
      await setDoc(doc(db,'userschat',res.user.uid),{})
      Navigate('/')
    });
  }
);
 
        

}
catch(err){
  seterr(true)
    
    console.log(err)
}
    

}

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h1>Sign up</h1>
                <form className="form" onSubmit={handlesummit}>
                    <label>username</label>
                    <input placeholder="enter your name" type="text"/>
                    <label>email</label>
                    <input placeholder="email" type="Email"/>
                    <label>password</label>
                    <input placeholder="password" type="password"/>
                    <label>profilepic</label>
                    <input type="file"/>
                    <button type='submit'>Register</button>
                  
                    
                         </form>
                         {err &&<div> <span>email id already exist</span>
                         <button><Link to='/login'>login</Link></button></div>}
            </div>
        </div>
    )
}

export default Signup