import React from 'react'
import './online.css'

export default function Online({user}) {
    return (
        <div>
            <ul className="rightbarFriendList">
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img src={user.profilePicture} alt="" className="rightbarProfileImg" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUserName">{user.username}</span>
            </li>
            
        </ul>
            
        </div>
    )
}
