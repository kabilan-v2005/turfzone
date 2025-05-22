import { useState } from "react";
import Logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can connect this part to your backend API easily
    console.log("Form Data:", formData);

    // Example: Call your backend API
    // axios.post("/api/send-otp", formData)
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err));
  };

  return (
    <div className="overall">
      <div className="left-log">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>

      <div className="right-log">
        <div className="form">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="lables">
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone No.</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          </div>

          <button type="submit">Get OTP</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
