import React from 'react'
import {FiSearch } from 'react-icons/fi'
import {AiFillPlusCircle,AiOutlineUser,AiFillEdit,AiFillDelete} from 'react-icons/ai'
import AddandUpdate from './AddandUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db} from '../config/firebase';
import { addDoc, collection, deleteDoc, getDoc,doc } from 'firebase/firestore'
import {BiUserCircle } from 'react-icons/bi'
import usedisclourser from '../hooks/disclourser'
const delteContact = async (id)=>{
  try {
    const docRef = doc(db, "contactus", id);
    await deleteDoc(docRef);
    toast.success("Deleted successfully");
  } catch (error) {
      console.log(error)
  }
}
const Contactcard = ({contact}) => {
  const {IsOpen,Onclose,Onopen} = usedisclourser();
 
  return (
    <div className='bgwhite'>
       <div key={contact.id}>

<div className='usericon' >
<BiUserCircle className='usericon'/>
  </div>
<div className="contactdetails">

<h2>{contact.name}</h2>
  <h2>{contact.email}</h2>
  </div>
  <div className='IconeditdeleteDiv'>
<AiFillEdit className="editIcon cursor-pointer" onClick={Onopen}/>
<AiFillDelete className="deleteIcon cursor-pointer" onClick={()=> delteContact(contact.id)}/>
  </div>
    </div>
    <AddandUpdate 
    contact={contact} 
    isupdate IsOpen={IsOpen} Onclose={Onclose}/>
    <ToastContainer/>
    </div>
  )
}

export default Contactcard
