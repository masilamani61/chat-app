
import { createContext, useEffect,useContext, useReducer, useState } from "react";
import { AuthContext } from "./authcontext";

export const  ChatContext=createContext()

export const Chatcontextprovider=({children})=>{
    
const {currentUser}=useContext(AuthContext)

  const initialstate={
    chatid:null,
    user:{}
  }

  const chatreducer=(state,action)=>{
    switch (action.type){
        case 'changeuser':return {
            user:action.payload,
            chatid:currentUser.uid>action.payload.uid?currentUser.uid+action.payload.uid:action.payload.uid+currentUser.uid
      

        }

        
    }
  }
  const [state ,dispatch]=useReducer(chatreducer,initialstate)
    
    return(
    <ChatContext.Provider value={{data:state,dispatch}}>
        {children}
    </ChatContext.Provider>
    )
}