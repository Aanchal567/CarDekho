import React, { useState } from "react";
import "./LatestCars.css";
import Navbar from "../../Navbar/Navbar";
import CarGrid from "./CarGrid";
import Footer from "../LatestCars/Footer";
import Sidebar from "./Sidebar";
import FindRightCar from "./FindRightCar";
import FAQ from "./FAQ";
import TrustBadges from "./TrustBadges";
import BrandPage from "./BrandPage/Brandpage";
import bannerImg from "../../assets/latestcar_banner_1.avif";



const LatestCars = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  if (selectedBrand) {
    return (
      <BrandPage
        brand={selectedBrand}
        onBack={() => setSelectedBrand(null)}
        onBrandClick={setSelectedBrand}
      />
    );
  }

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
        <Sidebar onBrandClick={setSelectedBrand} />
      </div>
      <TrustBadges />
      <Footer />
    </div>
  );
};

const HeroBanner = () => (
  <div id="topBanner">
    <img src={bannerImg} alt="banner" className="hero-banner-img" />
    <div className="bannercircle" />
    <div className="hero-overlay">
      <div className="hero-text">
        <h1>Know everything about the<br />latest cars</h1>
      </div>
      <div className="hero-filters">
        <select><option>Select Brand</option><option>Maruti</option><option>Tata</option><option>Hyundai</option></select>
        <select><option>Select Style</option><option>SUV</option><option>Sedan</option><option>Hatchback</option></select>
        <select><option>Select Launch Month</option><option>January</option><option>February</option><option>March</option></select>
        <button className="search-btn">Search</button>
      </div>
    </div>
  </div>
);

export default LatestCars;