import { useContext, useEffect, useState } from "react"
import Message from "./message"
import { ChatContext } from "../context/chatcontext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebas"
function Messages(){
   const [message,setmessage] =useState([])
   const {data}=useContext(ChatContext)
   console.log(db,data)


  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chat", data.chatid), (doc) => {
        setmessage(doc.data().messages)
    })
   
    return()=>{ unsub()}
   },[data.chatid])
   
    console.log(message)
    return (<div className='messages'>
        {
        message.map((m)=>(
            <Message message={m}/>
        ))
        }
        
        
       
       
    </div>)
}

export default Messages