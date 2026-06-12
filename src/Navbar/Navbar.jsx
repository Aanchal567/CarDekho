import React, { useState } from "react";
import "./Navbar.css";
import { Search, Heart, User, MapPin, ChevronDown } from "lucide-react";
import NewCarsDropdown from "./NewCarsDropdown";
import UsedCarsDropdown from "./UsedCarsDropdown";
import NewsDropdown from "./NewsDropdown";
import VideosDropdown from "./VideosDropdown";
import LanguageDropdown from "./LanguageDropdown";
import LocationModal from "./LocationModal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("Jaipur");

  return (
    <>
      <nav className="navbar">
        <div className="navbar-top">
          <div className="logo">
            <img src="https://stimg.cardekho.com/pwa/img/carDekho-newLogo.svg" alt="CarDekho" />
          </div>
          <div className="search-box">
            <select className="category-dropdown">
              <option>All</option>
              <option>New</option>
              <option>Used</option>
            </select>
            <div className="divider" />
            <Search size={18} color="#888" />
            <input type="text" placeholder="Search Cars" />
          </div>
          <div className="nav-right">
            <LanguageDropdown />
            <Heart size={22} color="#555" style={{ cursor: "pointer" }} />
            <div className="login">
              <User size={20} />
              Login / Register
            </div>
          </div>
        </div>

        <div className="navbar-bottom">
          <div className="menu">
            <NewCarsDropdown />
            <UsedCarsDropdown />
            <NewsDropdown />
            <VideosDropdown />
          </div>
          <div className="location" onClick={() => setShowModal(true)}>
            <MapPin size={16} />
            {city}
            <ChevronDown size={13} />
          </div>
        </div>
      </nav>

      {showModal && (
        <LocationModal
          onClose={() => setShowModal(false)}
          onSelectCity={c => { setCity(c); setShowModal(false); }}
        />
      )}
    </>
  );
};

export default Navbar;