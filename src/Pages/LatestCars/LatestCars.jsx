import React from "react";
import "./LatestCars.css";
import Sidebar from "./Sidebar";
import CarGrid from "./CarGrid";
import FindRightCar from "./FindRightCar";
import FAQ from "./FAQ";
import TrustBadges from "./TrustBadges";
import Footer from "./Footer";
import bannerImg from "../../assets/latestcar_banner_1.avif";

const LatestCars = () => {
  return (
    <div className="latest-cars-page">
      <HeroBanner />
      <div className="main-content">
        <div className="left-section">
          <CarGrid />
          <FindRightCar />
          <FAQ />
        </div>
        <Sidebar />
      </div>
      <TrustBadges />
      <Footer />
    </div>
  );
};

const HeroBanner = () => {
  return (
    <div id="topBanner">
      <img src={bannerImg} alt="banner" className="hero-banner-img" />
      <div className="bannercircle"></div>
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Know everything about the<br />latest cars</h1>
        </div>
        <div className="hero-filters">
          <select><option>Select Brand</option></select>
          <select><option>Select Style</option></select>
          <select><option>Select Launch Month</option></select>
          <button className="search-btn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default LatestCars;