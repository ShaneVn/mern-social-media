import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { logoutCall } from "../../apiCalls";
import { useNavigate } from "react-router"
import "./topbar.css";

function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ShaneSocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search ShaneSocial"
            type="text"
            className="searchInput"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">HomePage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topBarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture ? user.profilePicture : "/assets/blank.png"
            }
            alt=""
            className="topbarImage"
          />
        </Link>

        <button  onClick = {()=>{logoutCall(dispatch); navigate("/login")}}
        style={{ backgroundColor: "inherit", border: "none" , color:"white", cursor:"pointer"}}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Topbar;
