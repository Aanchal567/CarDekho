import React, { useState } from "react";
import "./CarGrid.css";
import { useApp } from "../../context/AppContext";
import { filterCarsData } from "../../data/carsData";
import { Heart, RefreshCw } from "lucide-react";

const badgeStyle = {
  Facelift:      { bg: "#fff3e0", color: "#e65c00", icon: "🔶" },
  Electric:      { bg: "#e8f5e9", color: "#2e7d32", icon: "⚡" },
  "New Variant": { bg: "#f3f3f3", color: "#333",    icon: "🔲" },
  "New Launch":  { bg: "#e1f5fe", color: "#0288d1", icon: "🆕" }
};

const CarGrid = () => {
  const { 
    activeFilters, 
    clearFilters, 
    searchQuery, 
    setSearchQuery,
    wishlist, 
    toggleWishlist, 
    setSelectedCar 
  } = useApp();

  const [visible, setVisible] = useState(12);

  // Filter cars dynamically
  const filteredCars = filterCarsData(activeFilters, searchQuery);

  // Check if any filters are currently active
  const hasActiveFilters = 
    searchQuery !== "" || 
    Object.values(activeFilters).some(val => val !== "");

  const handleClearAll = () => {
    clearFilters();
    setSearchQuery("");
  };

  const isLiked = (carName) => {
    return wishlist.some(item => item.name === carName);
  };

  return (
    <div className="car-grid-section" id="listings-section">
      <div className="grid-header-row">
        <h2 className="section-title">
          {hasActiveFilters ? "Search Results" : "Newly Launched cars in 2026"}
        </h2>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={handleClearAll}>
            <RefreshCw size={14} /> Clear Filters
          </button>
        )}
      </div>

      <p className="section-desc">
        There are {filteredCars.length} cars matching your selection. Popular latest cars include
        Tata Tiago, Tata Tiago EV, Tata Nexon, Hyundai Venue and Hyundai Creta.
      </p>

      {filteredCars.length === 0 ? (
        <div className="no-cars-found">
          <h3>No Cars Found</h3>
          <p>We couldn't find any cars matching your selected filters. Try clearing filters or searching for something else.</p>
          <button className="reset-btn" onClick={handleClearAll}>Reset Search</button>
        </div>
      ) : (
        <>
          <div className="cars-grid">
            {filteredCars.slice(0, visible).map((car, i) => (
              <div key={i} className="car-card" onClick={() => setSelectedCar(car)}>
                <div className="car-image">
                  <img src={car.img} alt={car.name} />
                  {car.badge && (
                    <span className="car-badge" style={{ background: badgeStyle[car.badge]?.bg, color: badgeStyle[car.badge]?.color }}>
                      {badgeStyle[car.badge]?.icon} {car.badge}
                    </span>
                  )}
                  <button 
                    className="card-heart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(car);
                    }}
                  >
                    <Heart 
                      size={20} 
                      color={isLiked(car.name) ? "#f75d34" : "#fff"} 
                      fill={isLiked(car.name) ? "#f75d34" : "rgba(0, 0, 0, 0.3)"} 
                    />
                  </button>
                </div>
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <div className="car-price">
                    {car.priceRaw}
                    {car.hasOffer && <span className="offer-tag">🏷 Offers</span>}
                  </div>
                  <div className="car-spec">
                    {car.cc} • {car.fuel} • {car.transmission}
                  </div>
                  <button 
                    className="offers-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCar(car);
                    }}
                  >
                    View June Offers
                  </button>
                  <div className="variants-info">📅 {car.variants} • {car.launchDate}</div>
                </div>
              </div>
            ))}
          </div>

          {visible < filteredCars.length && (
            <button className="load-more-btn" onClick={() => setVisible(v => v + 6)}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CarGrid;