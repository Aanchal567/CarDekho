import React, { useState } from "react";
import "./BrandPage.css";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../Footer";
import brandsData from "../../../data/brandsData.json";
import { useParams, useNavigate } from "react-router-dom";

import sideImg1  from "../../../assets/side_image1.jpg";
import sideImg2  from "../../../assets/side_image2.jpg";
import sideImg3  from "../../../assets/side_image3.jpg";
import sideImg4  from "../../../assets/side_image4.jpg";
import sideImg5  from "../../../assets/side_image5.jpg.avif";
import sideImg6  from "../../../assets/side_image6.jpg";
import sideImg7  from "../../../assets/side_image7.jpg";
import sideImg8  from "../../../assets/side_image8.jpg";
import sideImg9  from "../../../assets/side_image9.jpg";
import sideImg10 from "../../../assets/side_image10.jpg";
import sideImg11 from "../../../assets/side_image11.jpg";

import car1  from "../../../assets/car1.jpg";
import car2  from "../../../assets/car2.jpg";
import car3  from "../../../assets/car3.jpg";
import car4  from "../../../assets/car4.jpg";
import car5  from "../../../assets/car5.jpg";
import car6  from "../../../assets/car6.jpg";
import car7  from "../../../assets/car7.jpg";
import car8  from "../../../assets/car8.jpg";

const tabs = ["CARS", "DEALERS", "NEWS", "IMAGES", "VIDEOS", "ROAD TEST", "OFFERS", "SERVICE CENTERS"];

const carImages = [car1, car2, car3, car4, car5, car6, car7, car8];

// brand slug → brand name mapping
const slugToBrand = {
  "maruti-suzuki": "Maruti Suzuki",
  "tata":          "Tata",
  "hyundai":       "Hyundai",
  "mg-motor":      "MG Motor",
  "kia":           "Kia",
  "toyota":        "Toyota",
  "honda":         "Honda",
  "mahindra":      "Mahindra",
  "skoda":         "Skoda",
  "jeep":          "Jeep",
  "renault":       "Renault",
  "nissan":        "Nissan",
};

// Similar brands for each brand
const similarBrandsMap = {
  "Maruti Suzuki": [
    { name: "Tata",    logo: sideImg2 },
    { name: "Toyota",  logo: sideImg4 },
    { name: "Hyundai", logo: sideImg5 },
    { name: "Honda",   logo: sideImg7 },
    { name: "Renault", logo: sideImg11 },
    { name: "Mahindra",logo: sideImg6 },
  ],
  "Tata": [
    { name: "Maruti Suzuki", logo: sideImg1 },
    { name: "Hyundai",       logo: sideImg5 },
    { name: "Mahindra",      logo: sideImg6 },
    { name: "Kia",           logo: sideImg3 },
    { name: "Renault",       logo: sideImg11 },
    { name: "Honda",         logo: sideImg7 },
  ],
  "default": [
    { name: "Tata",          logo: sideImg2 },
    { name: "Toyota",        logo: sideImg4 },
    { name: "Hyundai",       logo: sideImg5 },
    { name: "Honda",         logo: sideImg7 },
    { name: "Renault",       logo: sideImg11 },
    { name: "Mahindra",      logo: sideImg6 },
  ]
};

const popularBrandsAll = [
  { name: "Kia",       logo: sideImg3  },
  { name: "MG Motor",  logo: sideImg8  },
  { name: "Skoda",     logo: sideImg9  },
  { name: "Jeep",      logo: sideImg10 },
  { name: "Nissan",    logo: sideImg11 },
  { name: "Volkswagen",logo: sideImg4  },
  { name: "Citroen",   logo: sideImg6  },
  { name: "Mercedes-Benz", logo: sideImg7 },
  { name: "BMW",       logo: sideImg8  },
];

const badgeClass = (badge) => {
  const map = {
    "Facelift":    "badge-facelift",
    "Electric":    "badge-electric",
    "New Launch":  "badge-new-launch",
    "New Variant": "badge-new-variant",
  };
  return map[badge] || "";
};

const badgeIcon = (badge) => {
  if (badge === "Electric")   return "⚡ ";
  if (badge === "Facelift")   return "🔶 ";
  if (badge === "New Launch") return "🆕 ";
  return "🔲 ";
};

const BrandPage = () => {
  const { brandSlug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("CARS");
  const [expanded, setExpanded] = useState(false);
  const [likedCars, setLikedCars] = useState({});

  // Extract brand name from slug — e.g. "maruti-suzuki-cars" → "maruti-suzuki"
  const slugKey = brandSlug?.replace(/-cars$/, "") || "maruti-suzuki";
  const brand = slugToBrand[slugKey] || "Maruti Suzuki";
  const data = brandsData[brand] || brandsData["Maruti Suzuki"];

  const similarBrands = similarBrandsMap[brand] || similarBrandsMap["default"];

  const handleBrandClick = (brandName) => {
    const slug = brandName.toLowerCase().replace(/ /g, "-");
    navigate(`/${slug}-cars`);
  };

  const toggleLike = (index) => {
    setLikedCars(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="brand-page">
      <Navbar />

      {/* Tab Bar */}
      <div className="brand-tabs">
        {tabs.map(tab => (
          <span
            key={tab}
            className={`brand-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="brand-main">
        <div className="brand-left">

          {/* Title + Rating */}
          <div className="brand-title-row">
            <h1>{brand} cars</h1>
            <div className="brand-rating">
              <span className="rating-num">{data.rating}/s</span>
              <span className="rating-star">⭐</span>
              <span className="rating-reviews">| {data.reviews} reviews</span>
            </div>
          </div>

          {/* Description */}
          <div className="brand-desc-box">
            <p className={expanded ? "" : "collapsed"}>{data.description}</p>
            <span className="read-more-link" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Read Less" : "Read More"}
            </span>
          </div>

          {/* Models Header */}
          <div className="brand-models-header">
            <h2>{brand} car models</h2>
            <span className="change-brand-btn" onClick={() => navigate("/latestcars")}>
              ✏️ Change Brand
            </span>
          </div>

          {/* Car Model Cards */}
          {data.models.map((car, i) => (
            <div key={i} className="brand-car-card">
              <div className="brand-car-img-wrap">
                <img src={carImages[i % carImages.length]} alt={car.name} />
                {car.badge && (
                  <span className={`model-badge ${badgeClass(car.badge)}`}>
                    {badgeIcon(car.badge)}{car.badge}
                  </span>
                )}
              </div>
              <div className="brand-car-info">
                <h3>{car.name}</h3>
                <div className="model-price">
                  {car.price}*
                  <span className="view-road-price">(View On Road Price)</span>
                </div>
                <div className="model-specs">
                  {car.fuel} • {car.kmpl} • {car.transmission}
                </div>
                <div className="model-specs-row2">
                  {car.cc} • {car.bhp} • {car.seats}
                </div>
                <button className="view-offers-btn">View June Offers</button>
              </div>
              <button
                className="heart-btn"
                onClick={() => toggleLike(i)}
                style={{ color: likedCars[i] ? "#e8590c" : "#ccc" }}
              >
                {likedCars[i] ? "❤️" : "🤍"}
              </button>
            </div>
          ))}

        </div>

        {/* ── SIDEBAR ── */}
        <aside className="brand-sidebar">

          {/* Ad Box */}
          <div className="sidebar-ad-box">
            <div className="ad-placeholder">Advertisement</div>
          </div>

          {/* Similar Brands */}
          <div className="brand-sidebar-card">
            <h3>Similar brands</h3>
            <div className="sb-brands-grid">
              {similarBrands.map((b, i) => (
                <div
                  key={i}
                  className="sb-brand-item"
                  onClick={() => handleBrandClick(b.name)}
                >
                  <img src={b.logo} alt={b.name} />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Brands */}
          <div className="brand-sidebar-card">
            <h3>Popular brands</h3>
            <div className="sb-brands-grid">
              {popularBrandsAll.map((b, i) => (
                <div
                  key={i}
                  className="sb-brand-item"
                  onClick={() => handleBrandClick(b.name)}
                >
                  <img src={b.logo} alt={b.name} />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Used Cars */}
          {data.discontinuedModels && data.discontinuedModels.length > 0 && (
            <div className="brand-sidebar-card">
              <h3>Popular {brand} used cars in Jaipur</h3>
              {data.discontinuedModels.map((car, i) => (
                <div key={i} className="used-car-item">
                  <div className="used-car-thumb">
                    <img src={carImages[i % carImages.length]} alt={car.name} />
                  </div>
                  <div className="used-car-info">
                    <div className="used-car-name">{car.name}</div>
                    <div className="used-car-price">Starting at {car.startingPrice}</div>
                  </div>
                </div>
              ))}
              <div className="view-used-link">
                View All Used {brand} Cars in Jaipur →
              </div>
            </div>
          )}

        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default BrandPage;