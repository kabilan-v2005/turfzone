import { useState } from "react";
import Logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    otp: "",
  });

  const [showOtpField, setShowOtpField] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!showOtpField) {
      // OTP request phase
      console.log("Sending OTP to:", formData.phone);
      // Simulate OTP sent
      setShowOtpField(true);
    } else {
      // OTP verification phase
      console.log("Verifying OTP:", formData.otp);
      // You can send the OTP for verification here
    }
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
              />

              <label htmlFor="phone">Phone No.</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              {showOtpField && (
                <>
                  <label htmlFor="otp">Enter OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>

            <button type="submit">
              {showOtpField ? "Verify OTP" : "Get OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
