import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Search, Heart, User, MapPin, ChevronDown, Trash2 } from "lucide-react";
import NewCarsDropdown from "./NewCarsDropdown";
import UsedCarsDropdown from "./UsedCarsDropdown";
import NewsDropdown from "./NewsDropdown";
import VideosDropdown from "./VideosDropdown";
import LanguageDropdown from "./LanguageDropdown";
import LocationModal from "./LocationModal";
import LoginModal from "./LoginModal";
import { useApp } from "../context/AppContext";
import { allCars, brandLogos } from "../data/carsData";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const {
    city,
    setCity,
    wishlist,
    removeFromWishlist,
    setSearchQuery,
    setSelectedCar,
    user,
    setUser
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#myaccount") {
      setShowLoginModal(true);
    }
  }, [location]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchText(val);

    if (val.trim() === "") {
      setSuggestions([]);
    } else {
      const query = val.toLowerCase();
      
      // Filter brands matching query
      const matchedBrands = Object.keys(brandLogos)
        .filter(brand => brand.toLowerCase().includes(query))
        .map(brand => ({ type: "brand", name: brand }));

      // Filter car models matching query
      const matchedModels = allCars
        .filter(car => car.name.toLowerCase().includes(query))
        .map(car => ({ type: "model", name: car.name, price: car.priceRaw, carObj: car }));

      // Combine and cap suggestions at 8 items
      const combined = [...matchedBrands, ...matchedModels].slice(0, 8);
      setSuggestions(combined);
    }
  };

  const handleSelectSuggestion = (sug) => {
    setSearchText("");
    setSuggestions([]);
    if (sug.type === "brand") {
      const slug = sug.name.toLowerCase().replace(/ /g, "-");
      navigate(`/${slug}-cars`);
    } else {
      setSelectedCar(sug.carObj);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setSearchQuery(searchText);
      setSuggestions([]);
      if (location.pathname !== "/" && location.pathname !== "/latestcars") {
        navigate("/latestcars");
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-top">
          <div className="logo" onClick={() => { setSearchQuery(""); navigate("/"); }} style={{ cursor: "pointer" }}>
            <img src="https://stimg.cardekho.com/pwa/img/carDekho-newLogo.svg" alt="CarDekho" />
          </div>
          
          <div className="search-wrapper">
            <div className="search-box">
              <select className="category-dropdown">
                <option>All</option>
                <option>New</option>
                <option>Used</option>
              </select>
              <div className="divider" />
              <Search size={18} color="#888" style={{ cursor: "pointer" }} onClick={handleSearchSubmit} />
              <input
                type="text"
                placeholder="Search Cars or Brands (e.g. Swift, Maruti, Nexon)"
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
              />
            </div>

            {suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((sug, i) => (
                  <div
                    key={i}
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion(sug)}
                  >
                    <span className="sug-type">{sug.type === "brand" ? "🏢 Brand" : "🚗 Model"}</span>
                    <div className="sug-info">
                      <span className="sug-name">{sug.name}</span>
                      {sug.type === "model" && <span className="sug-price">{sug.price}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="nav-right">
            <LanguageDropdown />
            
            <div 
              className="wishlist-wrapper"
              onMouseEnter={() => setShowWishlist(true)}
              onMouseLeave={() => setShowWishlist(false)}
            >
              <div className="wishlist-trigger">
                <Heart size={22} color={wishlist.length > 0 ? "#f75d34" : "#555"} fill={wishlist.length > 0 ? "#f75d34" : "none"} style={{ cursor: "pointer" }} />
                {wishlist.length > 0 && <span className="wishlist-badge">{wishlist.length}</span>}
              </div>
              
              {showWishlist && (
                <div className="wishlist-dropdown">
                  <h4>My Wishlist ({wishlist.length})</h4>
                  {wishlist.length === 0 ? (
                    <p className="empty-wishlist">Your wishlist is empty</p>
                  ) : (
                    <div className="wishlist-items">
                      {wishlist.map((car, index) => (
                        <div key={index} className="wishlist-item" onClick={() => setSelectedCar(car)}>
                          <img src={car.img} alt={car.name} className="wishlist-item-img" />
                          <div className="wishlist-item-info">
                            <span className="wishlist-item-name">{car.name}</span>
                            <span className="wishlist-item-price">{car.priceRaw}</span>
                          </div>
                          <button 
                            className="wishlist-item-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromWishlist(car.name);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {user ? (
              <div className="user-profile-menu">
                <div className="user-avatar-trigger">
                  <div className="avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown size={14} />
                </div>
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <h4>{user.name}</h4>
                    <p>{user.phone}</p>
                  </div>
                  <div className="profile-menu-item" onClick={() => navigate("/used-cars?tab=valuation")}>My Valuation</div>
                  <div className="profile-menu-item" onClick={() => { setSearchQuery(""); navigate("/sell-my-car"); }}>Sell My Car</div>
                  <div className="profile-divider" />
                  <div className="profile-menu-item logout-item" onClick={() => setUser(null)}>Logout</div>
                </div>
              </div>
            ) : (
              <div className="login" onClick={() => setShowLoginModal(true)}>
                <User size={20} />
                Login / Register
              </div>
            )}
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

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Navbar;