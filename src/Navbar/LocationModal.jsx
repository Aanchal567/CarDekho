import { useState } from "react";
import "./LocationModal.css";

function LocationModal({ onClose, onSelectCity }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      onSelectCity(input.trim());
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-title">We need your city to customize your experience</p>
        <input
          className="modal-input"
          type="text"
          placeholder="Type your city, e.g. Jaipur, New Delhi"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
}

export default LocationModal;