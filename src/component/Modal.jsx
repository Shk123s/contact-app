import React from 'react'
import {RxCross1 } from 'react-icons/rx'
const Modal = ({isOpen,onClose,children}) => {
  return (
    <div >
    {isOpen  &&( <div className="ModalBody">
    <div className="cross float-right text-2xl">
    < RxCross1 onClick={onClose}/>
        </div>
        {children}
      
    </div>)
    }
    {/* <div className='kuch bhi' onClick={onClose}/> */}
    </div>
  )
}

export default Modal
