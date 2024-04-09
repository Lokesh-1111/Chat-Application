import React,{useState,useEffect,useRef} from 'react'
import Contacts from '../components/Contacts'
import UserChat from '../components/UserChat'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Welcome from '../components/Welcome'
import {io} from 'socket.io-client'

const Chat = () => {

  const socket = useRef()
  const Navigate = useNavigate();

  const [contacts,setContacts] = useState([])
  const [currentUser,setCurentUser] = useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined);

  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      Navigate('/login')
    }
    else{
      setCurentUser(JSON.parse(localStorage.getItem('chat-app-user')))
    }
  },[])

  useEffect(()=>{
    
    const fetchData = async ()=>{
      try {
        if(currentUser){
          const users = await axios.get(`http://localhost:8000/api/allusers/${currentUser._id}`)
          setContacts(users.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchData()

    if(currentUser){
      socket.current = io("http://localhost:8000");
      socket.current.emit('add-user',currentUser._id)
    }

  },[currentUser])

  const handleChat = (chat)=>{
    setCurrentChat(chat)
  }



  return (
    <div className='Chatcontainer'>
      <div className='chatSection'>
          {currentUser && <Contacts contacts={contacts} currentUser={currentUser} currentChat={handleChat}/>}
          {currentChat===undefined && currentUser? 
          (<Welcome currentUser={currentUser}/>):
          (currentChat && <UserChat currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
          }
      </div>
    </div>
  )
}

export default Chat