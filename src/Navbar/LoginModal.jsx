import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import { X, Smartphone } from "lucide-react";
import { useApp } from "../context/AppContext";

const LoginModal = ({ onClose }) => {
  const { setUser } = useApp();
  const [step, setStep] = useState(1); // 1: Phone number, 2: OTP Entry
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("Guest User");
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setStep(2);
    setTimer(30);
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (otp !== "1234") {
      setError("Invalid OTP code. Please enter 1234 to verify.");
      return;
    }
    setError("");
    setUser({
      name: name.trim() || "Guest User",
      phone: `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`
    });
    onClose();
  };

  const handleResendOtp = () => {
    setIsResending(true);
    setError("");
    setTimeout(() => {
      setTimer(30);
      setIsResending(false);
      setOtp("");
    }, 1000);
  };

  const handleSocialLogin = (platform) => {
    setUser({
      name: `${platform} User`,
      phone: "+91 99999 99999"
    });
    onClose();
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="login-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="login-header-banner">
          <h3>CarDekho Profile</h3>
          <p>Login to save wishlist cars, check valuations, and sell vehicles commission-free.</p>
        </div>

        <div className="login-body">
          {step === 1 ? (
            <div className="login-step">
              <h4>Login or Register</h4>
              <p className="login-sub">Enter your mobile number to proceed</p>
              
              <form onSubmit={handlePhoneSubmit} className="login-form">
                <div className="login-input-group">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                    required
                    autoFocus
                  />
                </div>
                {error && <span className="login-error-msg">{error}</span>}
                <button type="submit" className="login-primary-btn">
                  Send OTP
                </button>
              </form>

              <div className="login-divider-text">
                <span>OR</span>
              </div>

              <div className="social-logins">
                <button 
                  className="social-btn google"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <img src="https://stimg.cardekho.com/pwa/img/google-logo.svg" alt="Google" width={18} height={18} style={{ marginRight: "10px" }} />
                  Continue with Google
                </button>
                <button 
                  className="social-btn apple"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <span style={{ fontSize: "16px", marginRight: "10px", fontWeight: "bold" }}></span>
                  Continue with Apple
                </button>
              </div>
            </div>
          ) : (
            <div className="login-step">
              <h4>Verify OTP</h4>
              <p className="login-sub">We've sent a mock verification code to +91 {phone}</p>
              
              <form onSubmit={handleOtpVerify} className="login-form">
                <div className="login-form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your profile name"
                    className="name-input"
                    required
                  />
                </div>

                <div className="login-form-group">
                  <label>Enter 4-Digit OTP</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Mock OTP: 1234"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                    className="otp-input"
                    required
                    autoFocus
                  />
                </div>
                {error && <span className="login-error-msg">{error}</span>}

                <div className="timer-section">
                  {timer > 0 ? (
                    <span className="otp-timer">Resend OTP in {timer}s</span>
                  ) : (
                    <button 
                      type="button" 
                      className="resend-otp-btn" 
                      onClick={handleResendOtp}
                      disabled={isResending}
                    >
                      {isResending ? "Resending..." : "Resend OTP"}
                    </button>
                  )}
                </div>

                <button type="submit" className="login-primary-btn">
                  Verify & Log In
                </button>
              </form>

              <button 
                type="button" 
                className="change-phone-btn"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setError("");
                }}
              >
                Change Mobile Number
              </button>
            </div>
          )}
        </div>

        <div className="login-footer">
          <p>By continuing, you agree to our <strong>Terms of Use</strong> & <strong>Privacy Policy</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
