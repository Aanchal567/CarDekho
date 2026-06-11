import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./LanguageDropdown.css";

function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("English");

  const languages = ["English", "हिन्दी", "தமிழ்", "తెలుగు", "മലയാളം", "ಕನ್ನಡ"];

  return (
    <div className="lang-dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="lang-label">
        {selected} <ChevronDown size={16} />
      </span>
      {open && (
        <div className="lang-menu">
          {languages.map((lang, index) => (
            <div
              key={index}
              className={`lang-item ${selected === lang ? "active" : ""}`}
              onClick={() => { setSelected(lang); setOpen(false); }}
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;