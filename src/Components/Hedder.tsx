import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";
import Loginicon from "../assets/loginicon.svg";
import "./Hedder.css";

function Hedder() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="nav">
      <img src={Logo} alt="Logo" className="logo" />
      
      {/* Wrap both login text and icon in a clickable div */}
      <div onClick={handleLoginClick} className="login-section" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
        <h4>Login</h4>
        <img src={Loginicon} alt="login icon" className="loginicon" />
      </div>
    </nav>
  );
}

export default Hedder;
