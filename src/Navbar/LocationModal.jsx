import { useState } from "react";
import "./LocationModal.css";

const popularCities = [
  { name: "New Delhi", icon: "🏛️" },
  { name: "Mumbai", icon: "🌊" },
  { name: "Bangalore", icon: "💻" },
  { name: "Jaipur", icon: "🏰" },
  { name: "Pune", icon: "⛰️" },
  { name: "Chennai", icon: "☀️" },
  { name: "Hyderabad", icon: "🕌" },
  { name: "Kolkata", icon: "🚊" }
];

function LocationModal({ onClose, onSelectCity }) {
  const [input, setInput] = useState("");
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-title">We need your city to customize your experience</p>
        
        <input
          className="modal-input"
          type="text"
          placeholder="Type your city, e.g. Jaipur, New Delhi"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && input.trim()) onSelectCity(input.trim()); }}
          autoFocus
        />

        <div className="popular-cities-section">
          <h3>Popular Cities</h3>
          <div className="popular-cities-grid">
            {popularCities.map((city) => (
              <div 
                key={city.name} 
                className="popular-city-card"
                onClick={() => onSelectCity(city.name)}
              >
                <div className="city-icon">{city.icon}</div>
                <div className="city-name">{city.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LocationModal;