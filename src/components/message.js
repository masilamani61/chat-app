import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../context/authcontext"
import { ChatContext } from "../context/chatcontext"

function Message({message}){
    const ref=useRef()
    const {currentUser}=useContext(AuthContext)
    const {data}=useContext(ChatContext)
    
    useEffect(()=>{
        ref.current?.scrollIntoView({behaviour:'smooth'})
    },[message])
    return <div  ref={ref}className={`message${message.senderid===currentUser.uid ? '':'send'}`}>

        <div className='messageinfo'>
          <img src={message.senderid===currentUser.uid ? currentUser.photoURL : data.user.photourl}/>
           <p>justnow</p>
        </div>
        <div className='messagecontent'>
            <p>{message.text}</p>
            { message.img &&
            <img src={message.img}
            />}
        </div>
    </div>
}
export default Message