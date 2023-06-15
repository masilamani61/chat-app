import Signup from "./pages/signup"
import './index.css'
import Login from "./pages/Login1"
import Home from "./pages/homepage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authcontext";
function App(){

  const {currentUser}=useContext(AuthContext)
  console.log(currentUser)
  const Protecteduser=({children})=>{
    if (!currentUser){
      return <Navigate to='/login'/>
    }
    return children
  }
  return(<BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Protecteduser><Home/></Protecteduser>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
    
  )
}

export default App