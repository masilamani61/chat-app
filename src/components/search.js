import { useContext, useState } from "react"
import { collection, query, where,getDocs,getDoc,setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebas";
import { AuthContext } from "../context/authcontext";

function Search(){
    const [username,setusername]=useState('')
    const [user,setuser]=useState(null)
    const [err,seterr]=useState(false)
    const {currentUser}=useContext(AuthContext)
    console.log(null)
    const searschuser=async()=>{
    console.log('search')
    const q=query(collection(db,'users'),where('displayname','==',username)) 
   
    
    
    try{  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
           
            setuser(doc.data()) 
       
        
    }      
     )
    }
    catch{
        window.alert('not found')
        console.log('comed')
        seterr(true)
    }
    }
    const handlesummit=(e)=>{
        console.log('key')
        e.code==="Enter" && searschuser()
    }
    const handleselect=async()=>{
        console.log('called')
        const combinedid=currentUser.uid>user.uid?currentUser.uid+user.uid:user.uid+currentUser.uid;
        try{
            const res=await getDoc(doc(db,'chat',combinedid))
            if (!res.exists()){
                await setDoc(doc(db,'chat',combinedid),{
                    messages:[]
                })
                await updateDoc(doc(db,'userschat',currentUser.uid),{
                    [combinedid+'.userinfo']:{
                        uid:user.uid,
                        displayname:user.displayname,
                        photourl:user.photourl
                    },
                    [combinedid+'.date']:serverTimestamp()
                        
                    
                });
                console.log(currentUser)
                await updateDoc(doc(db,'userschat',user.uid),{
                    [combinedid+'.userinfo']:{
                        uid:currentUser.uid,
                        displayname:currentUser.displayName,
                        photourl:currentUser.photoURL
                    },
                    [combinedid+'.date']:serverTimestamp()
                        
                    
                })
                console.log('finished',user.uid)

            }

        }
        catch (err){
            seterr(true)
            console.log(err)
        }
        setuser(null)
        setusername('')
        seterr(false)
        

    }

    
  
    return <div className='search'>
        <div className='searchinput'>
            
            <input placeholder="search your friend" type='text' onKeyDown={handlesummit} onChange={e=>{setusername(e.target.value)}}/>
            
{err ? <div>not found</div>:<div></div>}

        </div>
       
          { user &&
        <div className='searchinfo' onClick={handleselect}>
            <img src={user.photourl}/>
            <span>{user.displayname}</span>
        </div>
       
       }

    </div>
    {seterr(false)}
}
export default Search