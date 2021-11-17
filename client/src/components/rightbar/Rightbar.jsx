import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { AuthContext } from "../../context/AuthContext";
import "./rightbar.css";
import axios from "axios";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const[followed, setFollowed] = useState(false)


    useEffect(() => {
     setFollowed(currentUser.followings.includes(user?.id))
    }, [currentUser,user ])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
        console.log(friends);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);


  const handleClick = async()=>{
        try{

        }

        catch(err){
              console.log(err)
        }
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Jennifer Scarlet</b> and <b>3 other friends</b> have a birhday
            today.
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightBarFollowButton" onClick={handleClick}>
           {followed? "unfollow" : "follow"}
           {followed? <Remove/> : <Add/> }
            
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : "/assets/blank.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />

                <span
                  className="rightbarFollowingName"
                  style={{ alignSelf: "center" }}
                >
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
