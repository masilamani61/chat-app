import { useContext, useState } from "react"
import { AuthContext } from "../context/authcontext"
import { ChatContext } from "../context/chatcontext"
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebas"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import {v4 as uuid} from 'uuid'

function Input(){
    const {currentUser}=useContext(AuthContext)
    const {data}=useContext(ChatContext)

    const[text,settext]=useState('')
    const[img,setimg]=useState(null)
    const handlesend=async()=>{
        if (img){
            const storageRef=ref(storage,uuid());
            
const uploadTask = uploadBytesResumable(storageRef, img);
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
        await updateDoc(doc(db,'chat',data.chatid),{
            messages:arrayUnion({
                id:uuid(),
                text,
                senderid:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
            })
        
      
      


        })})}
)}
        else{
            var d=new Date()
            await updateDoc(doc(db,'chat',data.chatid),{
                messages:arrayUnion({
                    id:uuid(),
                    text,
                    senderid:currentUser.uid,
                    date:Timestamp.now()
                })


            })
            await updateDoc(doc(db,'userschat',data.user.uid),{
                [data.chatid+'.messages']:{
                    text,
                },
                [data.chatid+'.date']:serverTimestamp()
            })
            await updateDoc(doc(db,'userschat',currentUser.uid),{
                [data.chatid+'.messages']:{
                    text,
                },
                [data.chatid+'.date']:serverTimestamp()
            })
        }
        settext('')
        setimg(null)
    }

    return <div className='input'>
        <input className="inputbox" placeholder="enter your message" type='text' value={text} onChange={e=>{settext(e.target.value)}}/>
        <div className='send'>
            <input type='file' id='file'  onChange={e=>{setimg(e.target.files[0])}} style={{display:'none'}}/>
            <label htmlFor='file'>
            <i class="logo fa-solid fa-photo-film"></i>
            </label>
            <button className="buttonsend" onClick={handlesend}>send</button>
        </div>
    </div>
}
export default Input