import React, { useEffect } from 'react';
import './style.css';

const Modal = ({onClose, content}) => {
    useEffect(()=>{
        setTimeout(()=>{
            onClose()
        }, 2000);    
    })

    return (
        <div className="modal">
            {content}
        </div>
    );
}

export default Modal;