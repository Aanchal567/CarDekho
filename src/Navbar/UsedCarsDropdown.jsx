import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dropdown.css";

const menuItems = [
  { label: "Buy Used Cars", path: "/used-cars" },
  { label: "Used Cars In Your City", path: "/used-cars?city=local" },
  { label: "Sell My Car", path: "/sell-my-car" },
  { label: "Used Car Valuation", path: "/used-cars?tab=valuation" },
  { label: "Dealership Near Me", path: "/used-cars?tab=dealers" },
];

function UsedCarsDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">USED CARS <ChevronDown size={14} /></span>
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

export default UsedCarsDropdown;
