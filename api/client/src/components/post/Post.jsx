import { useState, useEffect, useContext } from "react";
import { MoreVert } from "@material-ui/icons";
import { axiosInstance } from "../../config";
import "./post.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  // console.log(Users.filter(u=>u.id === post.id))
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}/like`, { userId: currentUser._id });
  
    } catch (err) {
      console.log(err);
    }
    setLikeCount(prev=> isLiked? prev -1 : prev + 1)
    setIsLiked(prev=> !prev)
  };

  return (
    <div className="post">
      <div className="postwrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/blank.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="/assets/like.png"
              alt=""
              className={isLiked ? "likedIcon" : "likeIcon"}
              onClick={likeHandler}
            />
            {/* <img src="/assets/heart.png" alt="" className="likeIcon" onClick={likeHandler} /> */}
            <span className="postlikeCounter">{likeCount}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
