import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Dropdown.css";

function UsedCarsDropdown() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    "Buy Used Cars",
    "Used Cars In Your City",
    "Sell My Car",
    "Used Car Valuation",
    "Dealership Near Me",
  ];

  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">
        USED CARS <ChevronDown size={14} />
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

export default UsedCarsDropdown;