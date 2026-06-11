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
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [city, setCity] = useState("Jaipur");

    return (
        <>
            <nav className="navbar">
                <div className="navbar-top">
                    <div className="logo">
                        <img
                            src="https://stimg.cardekho.com/pwa/img/carDekho-newLogo.svg"
                            alt="logo"
                        />
                    </div>

                    <div className="search-box">
                        <select className="category-dropdown">
                            <option value="all">All</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                        <div className="divider"></div>
                        <Search size={20} />
                        <input type="text" placeholder="Search Cars" />
                    </div>

                    <div className="nav-right">
                        <LanguageDropdown />
                        <Heart size={24} />
                        <div className="login">
                            <User size={22} />
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
                    <div className="location" onClick={() => setShowLocationModal(true)}>
                        <MapPin size={18} />
                        {city}
                        <ChevronDown size={14} />
                    </div>
                </div>
            </nav>

            {showLocationModal && (
                <LocationModal
                    onClose={() => setShowLocationModal(false)}
                    onSelectCity={(c) => { setCity(c); setShowLocationModal(false); }}
                />
            )}
        </>
    );
};

export default Navbar;