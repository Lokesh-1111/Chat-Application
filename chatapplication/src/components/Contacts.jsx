import React, { useState } from 'react'
import Logo from '../assets/chat_app.jpeg'

const Contacts = ({ contacts, currentUser,currentChat }) => {
    // console.log(currentUser)
    const [avatarImage, setAvatarImage] = useState(undefined)
    const [currentSelected,setCurrentSelected] = useState(undefined)

    const HandleSelected = (index,contact)=>{
        setCurrentSelected(index)
        currentChat(contact)
    }

    return (
        <div className='ContactsContainer'>
            <div className='brand'>
                <img src={Logo} alt='Logo' />
                <h1>Chat App</h1>
            </div>
            <div>
                {contacts.map((contact, index) => {
                    return (
                        <div 
                        className={`contact ${index===currentSelected?'selected':""}`} 
                        key={index}
                        onClick={()=>HandleSelected(index,contact)}
                        >
                            <img src={contact.avatarImage} alt='Avatar' />
                            <h3>{contact.username}</h3>
                        </div>
                    )
                })}
            </div>
            <div className='CurrentUser'>
                <img src={currentUser.avatarImage} alt='Avatar' />
                <h3>{currentUser.username}</h3>
            </div>
        </div>
    )
}

export default Contacts