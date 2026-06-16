import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dropdown.css";

const menuItems = [
  { label: "Video Reviews", path: "/car-videos?tab=reviews" },
  { label: "Visual Stories", path: "/car-videos?tab=stories" },
];

function VideosDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">VIDEOS <ChevronDown size={14} /></span>
      {open && (
        <div className="dropdown-menu">
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              className="dropdown-item"
              onClick={() => handleItemClick(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default VideosDropdown;