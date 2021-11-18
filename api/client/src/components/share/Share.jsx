import { useContext, useState, useRef, useEffect } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import { axiosInstance } from "../../config";

export default function Share() {
  const { user, SetIsposted } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef()
  

  const submitHandler= async (e) =>{
      e.preventDefault()

      const newPost = {
        userId : user._id,
        desc: desc.current.value
      }

      try{
        await axiosInstance.post("/posts", newPost)
        SetIsposted(prev=> !prev)
       
      }

      catch(err){

      }
  }


 

  return (
    <div className="shareContainer">
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={
                user.profilePicture ? user.profilePicture : "/assets/blank.png"
              }
              alt=""
            />
            <input
              placeholder={`What's in your mind ${user.username}?`}
              type="text"
              className="shareInput"
              ref={desc}
            />
          </div>
          <hr className="shareHr" />
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  type="file"
                  style={{display:"none"}}
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.file[0])}
                ></input>
              </label>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>

            <button type ="submit" className="shareButton">Share</button>
          </form>
        </div>
      </div>
    </div>
  );
}
