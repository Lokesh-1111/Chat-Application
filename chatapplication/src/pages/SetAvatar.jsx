import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "../../node_modules/react-toastify/dist/ReactToastify.css"
import '../App.css'
import axios from 'axios'
import {json, useNavigate} from 'react-router-dom'

const SetAvatar = () => {

    const [avatars, setAvatars] = useState([])
    const [selected,setSelected] = useState(undefined)

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            const dataArray = [];
            for (let i = 0; i < 5; i++) {
                const response = await fetch(`https://api.multiavatar.com/${Math.round(Math.random() * 100)}.png`);
                const blob = await response.blob();
                dataArray.push(URL.createObjectURL(blob));
            }
            setAvatars(dataArray);
        };

        fetchData();
    }, []);

    const handleClick = (index)=>{
        setSelected(index);
    }

    const setProfile =async ()=>{
        if(selected === undefined){
            toast.error("Please select Avatar",{
                position:"top-right",
                autoClose:3000,
                pauseOnHover:true,
                draggable:true
            })
        }
        else{
            const user = JSON.parse(localStorage.getItem('chat-app-user'));
            // console.log(avatars);
            const userData = await axios.post(`http://localhost:8000/api/setavatar/${user._id}`,{
                image:avatars[selected]
            });

            // console.log(userData);
            if(userData.data.isSet === true){
                // console.log(user);
                user.isAvatarImageSet = true;
                user.avatarImage = userData.data.image
                localStorage.setItem('chat-app-user',JSON.stringify(user));
                navigate('/')
            }
            else{
                toast.error(userData.data.msg,{
                    pauseOnHover:true,
                    draggable:true,
                    autoClose:3000,
                    position:'top-right'
                })
            }
        }
    }



    return (
        <div className='AvatarContainer'>
            <div className='heading'>
                Pick an Avatar as a profile picture
            </div>
            <div className='ImageContainer'>
                {
                    !avatars.length ?
                        <div>
                            Loading...
                        </div>
                        : (
                            avatars.map((avatar, index) => {
                                return (
                                    <div className="Img" key={index} onClick={()=>handleClick(index)}>
                                        <img src={avatar} alt='Avatar' />
                                    </div>
                                )
                            })
                        )
                }
            </div>
            <button onClick={setProfile} className='btn'>Set a profile picture</button>
            <ToastContainer />
        </div>
    )
}

export default SetAvatar