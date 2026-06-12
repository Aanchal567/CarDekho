import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Dropdown.css";

const menuItems = [
  "News & Top stories", "Car Expert Reviews",
  "User Reviews", "Car Collection", "Tips & Advice",
];

function NewsDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">NEWS & REVIEWS <ChevronDown size={14} /></span>
      {open && (
        <div className="dropdown-menu">
          {menuItems.map((item, i) => <div key={i} className="dropdown-item">{item}</div>)}
        </div>
      )}
    </div>
  );
}
export default NewsDropdown;