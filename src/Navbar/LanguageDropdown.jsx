import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./LanguageDropdown.css";

const languages = ["English", "हिन्दी", "தமிழ்", "తెలుగు", "മലയാളം", "ಕನ್ನಡ"];

function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("English");
  return (
    <div className="lang-dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="lang-label">{selected} <ChevronDown size={16} /></span>
      {open && (
        <div className="lang-menu">
          {languages.map((lang, i) => (
            <div
              key={i}
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