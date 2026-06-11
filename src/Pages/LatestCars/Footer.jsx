import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-col">
        <h4>ABOUT CARDEKHO</h4>
        {["About", "Careers With Us", "Terms & Conditions", "Privacy Policy", "Corporate Policies", "Investors", "FAQs"].map(item => (
          <a key={item} href="#">{item}</a>
        ))}
      </div>
      <div className="footer-col">
        <h4>CONNECT WITH US</h4>
        {["Feedback", "Contact Us", "Advertise with Us", "Become Partner Dealer"].map(item => (
          <a key={item} href="#">{item}</a>
        ))}
      </div>
      <div className="footer-col">
        <h4>OTHERS</h4>
        {["TrucksDekho", "TyreDekho", "TractorsDekho", "Girnar Vision Fund", "Emergency Response", "Car Sales Trends"].map(item => (
          <a key={item} href="#">{item}</a>
        ))}
      </div>
      <div className="footer-col">
        <h4>EXPERIENCE CARDEKHO APP</h4>
        <div className="app-buttons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
        </div>
        <h4 style={{marginTop:"16px"}}>CARDEKHO GROUP VENTURES</h4>
        <div className="ventures">
          {["BikeDekho", "rupyy", "ZIGWHEELS", "InsuranceDekho", "revv", "carrum"].map(v => (
            <span key={v} className="venture-tag">{v}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 Girnar Software Pvt. Ltd.</span>
      <div className="social-links">
        Connect: 
        {["f", "𝕏", "▶", "📷", "in"].map((s, i) => (
          <span key={i} className="social-icon">{s}</span>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;