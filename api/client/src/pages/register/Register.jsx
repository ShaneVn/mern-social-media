import { useRef,useState } from "react";
import "./register.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate()
  const [err, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosInstance.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        
        setError("Email already exist");
        console.log(err)
        
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Shanesocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Shanesocial
          </span>
        </div>

        <form className="loginRight" onSubmit={handleSubmit}>
          <div className="loginBox">
            <input
              required
              placeholder="Username"
              type="text"
              className="loginInput"
              ref = {username}
            />
            <input
              required
              placeholder="Email"
              type="email"
              className="loginInput"
              ref= {email}
            />
            <input
              required
              placeholder="Password"
              type="password"
              className="loginInput"
              ref = {password}
              // minLength="6"
            />
            <input
              required
              placeholder="Password Again "
              type="password"
              className="loginInput"
              ref = {passwordAgain}
              // minLength="6"
            />
            <button className="loginButton">Register</button>
            <span className="loginForgot">Forget Password</span>
            <Link to="/login" className="LinktoLoginButton">
              <button className="loginRegisterButton">
                Already have an account
              </button>
            </Link>
            <p style={{color:"red", alignSelf:"center"}}>{err}</p>
          </div>
          
        </form>
      </div>
    </div>
  );
}
