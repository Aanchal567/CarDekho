import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Dropdown.css";

function VideosDropdown() {
  const [open, setOpen] = useState(false);

  const menuItems = ["Video Reviews", "Visual Stories"];

  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">
        VIDEOS <ChevronDown size={14} />
      </span>
      {open && (
        <div className="dropdown-menu">
          {menuItems.map((item, index) => (
            <div key={index} className="dropdown-item">{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideosDropdown;