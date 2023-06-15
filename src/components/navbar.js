import { signOut } from "firebase/auth"
import { auth } from "../firebas"
import { useContext } from "react"
import { AuthContext } from "../context/authcontext"

function Navbar(){
    const {currentUser}=useContext(AuthContext)
    return <div className='navbar'>
        <span className='logo'>Whats app</span>
        <div className='user'>
            <img src={currentUser.photoURL}/>
            <span >{currentUser.displayName}</span>
            <button onClick={()=>{signOut(auth)}}>logout</button>
        </div>
    </div>
}
export default Navbar