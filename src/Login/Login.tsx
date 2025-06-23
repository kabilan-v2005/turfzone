import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    username: "",
  });


  const [showOtpField, setShowOtpField] = useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = useState<boolean | null>(
    null
  );
  const navigate = useNavigate();

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
   

      if (!/^\d{10}$/.test(formData.phone)) {
        alert("Enter a valid 10-digit phone number.");
        return;
      }

      setShowOtpField(true);
    } else if (isRegisteredUser === null) {
      if (!formData.otp || formData.otp.length < 4) {
        alert("Please enter a valid OTP.");
        return;
      }

      const mockRegisteredUsers = ["9876543210", "1234567890"];
      const isRegistered = mockRegisteredUsers.includes(formData.phone);

      setIsRegisteredUser(isRegistered);

      if (isRegistered) {
        alert("OTP Verified! Redirecting...");
        navigate("/");
      }
    } else {
      if (!formData.username.trim()) {
        alert("Please enter your username.");
        return;
      }

      console.log("New User:", formData.username);
      alert("Username saved! Redirecting...");
      navigate("/");
    }
  };

  return (
    <div className="overall">
      {/* Left: Logo */}
      <div className="left-log">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>

      {/* Right: Login box */}
      <div className="right-log">
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Username Section (Only for New Users) */}
            {isRegisteredUser === false && (
              <>
              <div className="username-block">
                <div className="avatar">
                  {formData.username
                    ? formData.username.charAt(0).toUpperCase()
                    : "👤"}
                </div>
                </div>
                <label htmlFor="username">User Name:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
               
                  value={formData.username}
                  onChange={handleChange}
                />
              </>
            )}

            {/* Phone and OTP Section */}
            {isRegisteredUser !== false && (
              <>
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
                
                  </div>
                )}

                {showOtpField && isRegisteredUser === null && (
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
              </>
            )}

            <button type="submit">
              {!showOtpField
                ? "Get OTP"
                : isRegisteredUser === false
                ? "Save"
                : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
