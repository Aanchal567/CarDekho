import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dropdown.css";

const menuItems = [
  { label: "Explore New Cars", path: "/new-cars" },
  { label: "Electric Cars", path: "/new-cars?fuel=electric" },
  { label: "Popular Cars", path: "/new-cars?tab=popular" },
  { label: "Upcoming Cars", path: "/new-cars?tab=upcoming" },
  { label: "New Launches", path: "/new-cars?tab=upcoming" },
  { label: "Popular Brands", path: "/latestcars" },
  { label: "Compare Cars", path: "/compare-cars" },
  { label: "New Car Offers & Discounts", path: "/new-cars?tab=offers" },
  { label: "Find Car Dealers", path: "/new-cars?tab=popular" },
  { label: "Find EV Charging Stations", path: "/new-cars?fuel=electric" },
  { label: "Find Fuel Stations", path: "/new-cars" },
  { label: "Check Fuel Prices", path: "/new-cars" },
];

function NewCarsDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">NEW CARS <ChevronDown size={14} /></span>
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
export default NewCarsDropdown;