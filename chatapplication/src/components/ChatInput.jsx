import React, { useState } from 'react'
import { FaSmile } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Picker from 'emoji-picker-react'

const ChatInput = ({handleChat}) => {

    const [msg, setMsg] = useState("")
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)

    const handleChange = (e) => {
        setMsg(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        handleChat(msg);
        setMsg("");
        setShowEmojiPicker(false)
    }

    const handleEmojiShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (e)=>{
        let Message = msg;
        Message += e.emoji
        setMsg(Message)
    }

    return (
        <div className='InputContainer'> 
            <div className='emojiPicker'>
                <FaSmile onClick={handleEmojiShow} />
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
            </div>
            <form className='inputText' onSubmit={handleClick}>
                <input
                    type='text'
                    placeholder='Enter Your Text Here'
                    value={msg}
                    onChange={handleChange}
                    onClick={()=>setShowEmojiPicker(false)}
                />
                <button type='submit'>
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}

export default ChatInput