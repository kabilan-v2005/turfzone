import { useState } from "react";
import Logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });

  const [isHuman, setIsHuman] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHuman(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!showOtpField) {
      if (!isHuman) {
        alert("Please confirm you're not a robot.");
        return;
      }

      if (!/^\d{10}$/.test(formData.phone)) {
        alert("Enter a valid 10-digit phone number.");
        return;
      }

      console.log("Sending OTP to:", formData.phone);
      setShowOtpField(true);
    } else {
      if (!formData.otp || formData.otp.length < 4) {
        alert("Please enter a valid OTP.");
        return;
      }
      console.log("Verifying OTP:", formData.otp);
      // Add OTP verification logic here
      alert("OTP Verified!");
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

            <label htmlFor="phone">Phone No.</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={showOtpField}
            />

            {!showOtpField && (
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="robotCheck"
                  checked={isHuman}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="robotCheck">I am not a robot</label>
              </div>
            )}

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
