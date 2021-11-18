import { useContext } from "react";
import Profile from "./pages/profile/Profile";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

// import {Person} from "@material-ui/icons"

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
