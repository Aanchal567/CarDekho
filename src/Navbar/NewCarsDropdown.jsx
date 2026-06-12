import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Dropdown.css";

const menuItems = [
  "Explore New Cars", "Electric Cars", "Popular Cars",
  "Upcoming Cars", "New Launches", "Popular Brands",
  "Compare Cars", "New Car Offers & Discounts",
  "Find Car Dealers", "Find EV Charging Stations",
  "Find Fuel Stations", "Check Fuel Prices",
];

function NewCarsDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">NEW CARS <ChevronDown size={14} /></span>
      {open && (
        <div className="dropdown-menu">
          {menuItems.map((item, i) => <div key={i} className="dropdown-item">{item}</div>)}
        </div>
      )}
    </div>
  );
}
export default NewCarsDropdown;