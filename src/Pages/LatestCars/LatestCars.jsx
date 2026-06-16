import React, { useState } from "react";
import "./LatestCars.css";
import Navbar from "../../Navbar/Navbar";
import CarGrid from "./CarGrid";
import Sidebar from "./Sidebar";
import FindRightCar from "./FindRightCar";
import FAQ from "./FAQ";
import TrustBadges from "./TrustBadges";
import Footer from "./Footer";
import bannerImg from "../../assets/latestcar_banner_1.avif";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import CarDetailsModal from "./CarDetailsModal";

const LatestCars = () => {
  const navigate = useNavigate();
  const { selectedCar } = useApp();

  const handleBrandClick = (brandName) => {
    const slug = brandName.toLowerCase().replace(/ /g, "-");
    navigate(`/${slug}-cars`);
  };

  return (
    <div className="latest-cars-page">
      <Navbar />
      <HeroBanner />
      <div className="main-content">
        <div className="left-section">
          <CarGrid />
          <FindRightCar />
          <FAQ />
        </div>
        <Sidebar onBrandClick={handleBrandClick} />
      </div>
      <TrustBadges />
      <Footer />

      {/* Unified specifications & booking modal */}
      {selectedCar && <CarDetailsModal />}
    </div>
  );
};

const HeroBanner = () => {
  const { setActiveFilters } = useApp();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const handleSearch = () => {
    setActiveFilters({
      brand: selectedBrand,
      bodyType: selectedStyle,
      budget: selectedBudget,
      fuel: "",
      transmission: "",
      seating: "",
    });

    // Smooth scroll down to the listings grid
    const element = document.getElementById("listings-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="topBanner">
      <img src={bannerImg} alt="banner" className="hero-banner-img" />
      <div className="bannercircle" />
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Know everything about the<br />latest cars</h1>
        </div>
        <div className="hero-filters">
          <select 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select Brand</option>
            <option value="Maruti Suzuki">Maruti Suzuki</option>
            <option value="Tata">Tata</option>
            <option value="Hyundai">Hyundai</option>
            <option value="MG Motor">MG Motor</option>
            <option value="Kia">Kia</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Skoda">Skoda</option>
            <option value="Jeep">Jeep</option>
            <option value="Renault">Renault</option>
            <option value="Nissan">Nissan</option>
          </select>

          <select 
            value={selectedStyle} 
            onChange={(e) => setSelectedStyle(e.target.value)}
          >
            <option value="">Select Style</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="MUV">MUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
          </select>

          <select 
            value={selectedBudget} 
            onChange={(e) => setSelectedBudget(e.target.value)}
          >
            <option value="">Select Budget</option>
            <option value="Under 5 Lakh">Under 5 Lakh</option>
            <option value="5 - 10 Lakh">5 - 10 Lakh</option>
            <option value="10 - 15 Lakh">10 - 15 Lakh</option>
            <option value="15 - 20 Lakh">15 - 20 Lakh</option>
            <option value="Above 20 Lakh">Above 20 Lakh</option>
          </select>

          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default LatestCars;