import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import {FiSearch } from 'react-icons/fi'
import {BiUserCircle } from 'react-icons/bi'
import {db } from './config/firebase'
import {AiFillPlusCircle,AiOutlineUser,AiFillEdit,AiFillDelete} from 'react-icons/ai'
import { collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import Contactcard from './component/Contactcard'
import Modal from './component/Modal'
import AddandUpdate from './component/AddandUpdate'
import usedisclourser from './hooks/disclourser'
import { ToastContainer } from 'react-toastify'
const App = () => {
 const filter = (e)=>{
  const value = e.target.value;
  const contactsRef = collection(db,"contactus");
  // const contactSnapshot = await getDocs(contactsRef);
  onSnapshot(contactsRef,(snapshot)=>{
    const contactLists = snapshot.docs.map((doc)=>{
      return{
        id:doc.id,
        ...doc.data(),
      };
    });
    const filteredContacts = contactLists.filter((contact) =>
    contact.name.toLowerCase().includes(value.toLowerCase())
  );

  setContacts(filteredContacts);
    setLoading(false);
    return contactLists;
  })
 
 }




  const [Contacts,setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {IsOpen,Onclose,Onopen} = usedisclourser();



  useEffect(()=>{
    const getContacts = async ()=>{
      try {
        const contactsRef = collection(db,"contactus");
        // const contactSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data(),
            };
          });
          console.log(contactLists);
          setContacts(contactLists);
          setLoading(false);
          return contactLists;
        })
       
      } catch (error) {
        console.log(error)
      }
    }
    getContacts();
  },[]);
  if (loading) {
    return <div className='Loading'>Loading...</div>;
  }
  return (
    <div className='AllElement'>
        <Navbar/>
  <div className="searchElement">
  <div className="input">
   <FiSearch className='searchicon'/>
    <input onChange={filter} type="text" className='inputb' />
   </div>
   <div className="divplusicon">
   <AiFillPlusCircle  className='plusicon' onClick={Onopen}/>
   </div>
   </div>
   <div className='Contactdata'
   >{
   Contacts.map((contact)=>(
   <Contactcard key={contact.id} contact={contact}/>
   ))}
   </div>
 <AddandUpdate IsOpen={IsOpen} Onclose={Onclose}/>
 <ToastContainer/>
    </div>
  )
}

export default App
