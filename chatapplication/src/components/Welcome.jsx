import React from 'react'
import robot from '../assets/welcome.gif'

const Welcome = ({currentUser}) => {
  return (
    <div className='WelcomeContainer'>
        <div>
            <img src={robot} alt='Robot' />
        </div>
        <div>
            <h2>Welcome! {currentUser.username}</h2>
        </div>
    </div>
  )
}

export default Welcome