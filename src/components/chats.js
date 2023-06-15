import { useContext, useEffect, useState } from "react"
import { db } from "../firebas";
import {doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/authcontext";
import { ChatContext } from "../context/chatcontext";

function Chats(){

    const {currentUser}=useContext(AuthContext)
    const[chats,setchat]=useState([])
    const {dispatch}=useContext(ChatContext)
    
    useEffect(()=>{
    const getchat=()=>{ 
    const unsub = onSnapshot(doc(db, "userschat", currentUser.uid), (doc) => {
        setchat(doc.data())
    });
  
    }
    currentUser.uid && getchat()
    },[currentUser.uid])
    console.log(Object.entries(chats))

    const handleselect=(u)=>{
        dispatch({type:'changeuser',payload:u})
    }
    return <div>
        
        {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
           
             <div key={chat[0]} className='searchinfo' onClick={()=>{handleselect(chat[1]?.['userinfo'])}}>
             <img src={chat[1]?.['userinfo']?.['photourl']}/>
             <span>{chat[1]?.['userinfo']?.['displayname']}</span>
             <p>{chat[1]?.['messages']?.['text']}</p>
         </div>
        ))}
        
      
    </div>
        }
export default Chats