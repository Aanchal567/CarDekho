import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Dropdown.css";

function NewsDropdown() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    "News & Top stories",
    "Car Expert Reviews",
    "User Reviews",
    "Car Collection",
    "Tips & Advice",
  ];

  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">
        NEWS & REVIEWS <ChevronDown size={14} />
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

export default NewsDropdown;