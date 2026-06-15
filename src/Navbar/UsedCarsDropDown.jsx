import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dropdown.css";

const menuItems = [
  "Buy Used Cars", "Used Cars In Your City",
  "Sell My Car", "Used Car Valuation", "Dealership Near Me",
];

function UsedCarsDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="menu-label">USED CARS <ChevronDown size={14} /></span>
      {open && (
        <div className="dropdown-menu">
          {menuItems.map((item, i) => {
            if (item === "Sell My Car") {
              return (
                <div
                  key={i}
                  className="dropdown-item"
                  onClick={() => navigate("/sell-used-car")}
                >
                  Sell My Car
                </div>
              );
            }
            return (
              <div key={i} className="dropdown-item">{item}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UsedCarsDropdown;
