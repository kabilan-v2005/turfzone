
import Logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  return (
    <div className="overall">
      <div className="left">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>

      <div className="right">
        <form className="login-form">
          <h2>Login</h2>

          <label htmlFor="username">User Name:</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="phone">Phone No.</label>
          <input type="text" id="phone" name="phone" />

          <button type="submit">Get OTP</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
