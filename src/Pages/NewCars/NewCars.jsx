import React, { useState, useEffect } from "react";
import "./NewCars.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../LatestCars/Footer";
import TrustBadges from "../LatestCars/TrustBadges";
import CarDetailsModal from "../LatestCars/CarDetailsModal";
import { useApp } from "../../context/AppContext";
import { allCars } from "../../data/carsData";
import { useLocation } from "react-router-dom";
import { Heart } from "lucide-react";

const NewCars = () => {
  const { selectedCar, setSelectedCar, wishlist, toggleWishlist, city } = useApp();
  const [activeTab, setActiveTab] = useState("popular");
  const location = useLocation();

  useEffect(() => {
    // Parse query params to set active tab or filters
    const params = new URLSearchParams(location.search);
    const fuelParam = params.get("fuel");
    const tabParam = params.get("tab");
    if (fuelParam === "electric") {
      setActiveTab("electric");
    } else if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Filter cars based on tab selection
  const getCars = () => {
    switch (activeTab) {
      case "upcoming":
        return allCars.filter(car => car.badge === "New Launch" || car.launchDate.includes("Expected"));
      case "electric":
        return allCars.filter(car => car.fuel.toLowerCase().includes("electric"));
      case "offers":
        return allCars.filter(car => car.hasOffer);
      case "popular":
      default:
        return allCars.filter(car => car.rating >= 4.4);
    }
  };

  const isLiked = (carName) => {
    return wishlist.some(item => item.name === carName);
  };

  return (
    <div className="new-cars-page">
      <Navbar />

      <div className="new-cars-hero">
        <div className="hero-content">
          <h1>Explore New Cars in {city}</h1>
          <p>Find the best deals, ex-showroom prices, specs, and upcoming models in your city.</p>
        </div>
      </div>

      <div className="new-cars-main">
        <div className="tab-menu">
          <button 
            className={`tab-btn ${activeTab === "popular" ? "active" : ""}`}
            onClick={() => setActiveTab("popular")}
          >
            Popular New Cars
          </button>
          <button 
            className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Cars
          </button>
          <button 
            className={`tab-btn ${activeTab === "electric" ? "active" : ""}`}
            onClick={() => setActiveTab("electric")}
          >
            Electric New Cars
          </button>
          <button 
            className={`tab-btn ${activeTab === "offers" ? "active" : ""}`}
            onClick={() => setActiveTab("offers")}
          >
            Car Offers
          </button>
        </div>

        <div className="new-cars-grid">
          {getCars().map((car, index) => (
            <div 
              key={index} 
              className="new-car-card" 
              onClick={() => setSelectedCar(car)}
            >
              <div className="car-card-img">
                <img src={car.img} alt={car.name} />
                {car.badge && <span className="badge-tag">{car.badge}</span>}
                <button 
                  className="card-heart"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(car);
                  }}
                >
                  <Heart 
                    size={18} 
                    color={isLiked(car.name) ? "#f75d34" : "#fff"}
                    fill={isLiked(car.name) ? "#f75d34" : "rgba(0,0,0,0.3)"}
                  />
                </button>
              </div>
              <div className="car-card-body">
                <h3>{car.name}</h3>
                <div className="price-tag">{car.priceRaw}</div>
                <div className="specs-info">{car.cc} • {car.fuel} • {car.transmission}</div>
                <div className="rating-row">
                  <span className="rating-star">⭐ {car.rating}</span>
                  <span className="rating-count">({car.reviews} reviews)</span>
                </div>
                <button className="check-offers">View June Offers</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TrustBadges />
      <Footer />

      {selectedCar && <CarDetailsModal />}
    </div>
  );
};

export default NewCars;
