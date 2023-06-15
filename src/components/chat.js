import Messages from "./messages"
import Input from './input'
import { useContext } from "react"
import { ChatContext } from "../context/chatcontext"

function Chat(){
    const {data}=useContext(ChatContext)
    return <div className='chat'>
        <div className='chatinfo'>
            <span>{data.user.displayname}</span>
        </div>
        {data.chatid ?
        <Messages/>:<div className="spacing">tap the chat or search the chat</div>}
        <Input/>
    </div>
}
export default Chat