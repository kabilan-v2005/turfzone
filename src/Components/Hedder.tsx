import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";
import Loginicon from "../assets/loginicon.svg";
import "./Hedder.css";
import { useAuth } from '../context/AuthContext';

function Hedder() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  // Get user data from either Firebase auth or localStorage
  const userEmail = currentUser?.email || 
    (localStorage.getItem('user') ? 
      JSON.parse(localStorage.getItem('user') || '{}').email : 
      null);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    await logout();
    navigate("/");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="nav">
      <img src={Logo} alt="Logo" className="logo" />
      
      {userEmail ? (
        <div className="user-menu">
          <div className="user-email">
            <span>{userEmail}</span>
          </div>
          <div 
            onClick={handleDashboardClick} 
            className="dashboard-btn" 
            style={{ cursor: "pointer", marginRight: "20px" }}
          >
            Dashboard
          </div>
          <div 
            onClick={handleLogoutClick} 
            className="login-section" 
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <h4>Logout</h4>
            <img src={Loginicon} alt="logout icon" className="loginicon" />
          </div>
        </div>
      ) : (
        <div 
          onClick={handleLoginClick} 
          className="login-section" 
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
        >
          <h4>Login</h4>
          <img src={Loginicon} alt="login icon" className="loginicon" />
        </div>
      )}
    </nav>
  );
}

export default Hedder;
