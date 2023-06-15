import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebas";

export const  AuthContext=createContext()

export const Authcontextprovider=({children})=>{
    const [currentUser,setcurruser]=useState({})
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setcurruser(user)
            console.log(user)
        })
    },[]);
    return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    )
}