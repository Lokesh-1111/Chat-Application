import React,{useState,useEffect, useRef} from 'react'
import { IoIosPower } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ChatInput from './ChatInput';
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

const UserChat = ({currentChat,currentUser,socket}) => {

  const navigate = useNavigate();

  const [messages,setMessages] = useState([])
  const [arrivalMessage,setArrivalMessage] = useState(null)
  const scrollRef = useRef()

  const handleClick = ()=>{
    localStorage.clear();
    navigate('/login');
  }

  const handleChat = async (chat)=>{

    try {
      const chatData = await axios.post("http://localhost:8000/message/addmessage",{
      to:currentChat._id,
      from:currentUser._id,
      message:chat
    })

    socket.current.emit('send-msg',{
      to:currentChat._id,
      from:currentUser._id,
      msg:chat
    })

    const msgs = [...messages]
    msgs.push({fromSelf:true,message:chat})
    setMessages(msgs)

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{

    const fetchMessages = async ()=>{
      try {
        const userMsg = await axios.post("http://localhost:8000/message/getmessage",{
        from:currentUser._id,
        to:currentChat._id
      })
      // console.log(userMsg.data)
      setMessages(userMsg.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMessages()
    
  },[currentChat])

  useEffect(()=>{
    socket.current.on('msg-receive',(msg)=>{
      setArrivalMessage({fromSelf:false,message:msg})
    })
  },[])
  
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})

  },[messages])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage])

  

  return (
    <div className='UserChatContainer'>
      <div className='footer'>
        <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
          <img src={currentChat.avatarImage} />
          <span style={{fontSize:'1.5rem'}}>{currentChat.username}</span>
        </div>
        <div className='powerBtn' onClick={handleClick}>
          <IoIosPower />
        </div>
      </div>
      <div className='chat-messages'>
        {
          messages.map((message,index)=>{
            return(
              <div
                ref={scrollRef}
                key={uuidv4()}
              >
                <div 
              className={`message ${message.fromSelf=== true ? 'sender':'receiver'}`} 
              key={index} 
              >
                  <div className='content'>
                    <p>{message.message}</p>
                  </div>
              </div>
              </div>
            )
          })
        }
      </div>
      <ChatInput handleChat={handleChat}/>
    </div>
  )
}

export default UserChat