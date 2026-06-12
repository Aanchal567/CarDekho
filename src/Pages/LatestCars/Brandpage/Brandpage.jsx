import brandsData from "../../../data/brandsData.json";
import React, { useState } from "react";
import { useParams } from "react-router-dom";


import Navbar from "../../../Navbar/Navbar";
import sideImg1 from "../../../assets/side_image1.jpg";
import sideImg2 from "../../../assets/side_image2.jpg";
import sideImg3 from "../../../assets/side_image3.jpg";
import sideImg4 from "../../../assets/side_image4.jpg";
import sideImg5 from "../../../assets/side_image5.jpg.avif";
import sideImg6 from "../../../assets/side_image6.jpg";
import sideImg7 from "../../../assets/side_image7.jpg";
import sideImg8 from "../../../assets/side_image8.jpg";
import sideImg9 from "../../../assets/side_image9.jpg";
import sideImg10 from "../../../assets/side_image10.jpg";
import sideImg11 from "../../../assets/side_image11.jpg";

import car1 from "../../../assets/car1.jpg";
import car2 from "../../../assets/car2.jpg";
import car3 from "../../../assets/car3.jpg";
import car4 from "../../../assets/car4.jpg";
import car5 from "../../../assets/car5.jpg";
import car6 from "../../../assets/car6.jpg";
import car7 from "../../../assets/car7.jpg";
import car8 from "../../../assets/car8.jpg";
import Footer from "../Footer";
const tabs = ["CARS", "DEALERS", "NEWS", "IMAGES", "VIDEOS", "ROAD TEST", "OFFERS", "SERVICE CENTERS"];

const sidebarBrands = [
  { name: "Kia",          logo: sideImg3  },
  { name: "Hyundai",      logo: sideImg5  },
  { name: "MG Motor",     logo: sideImg8  },
  { name: "Skoda",        logo: sideImg9  },
  { name: "Jeep",         logo: sideImg10 },
  { name: "Nissan",       logo: sideImg11 },
  { name: "Volkswagen",   logo: sideImg4  },
  { name: "Citroen",      logo: sideImg6  },
  { name: "Mercedes-Benz",logo: sideImg7  },
];

// Map car images to model index
const carImages = [car1, car2, car3, car4, car5, car6, car7, car8];

const badgeClass = (badge) => {
  if (!badge) return "";
  const map = {
    "Facelift":    "badge-facelift",
    "Electric":    "badge-electric",
    "New Launch":  "badge-new-launch",
    "New Variant": "badge-new-variant",
  };
  return map[badge] || "badge-new-variant";
};

const badgeIcon = (badge) => {
  if (badge === "Electric")   return "⚡ ";
  if (badge === "Facelift")   return "🔶 ";
  if (badge === "New Launch") return "🆕 ";
  return "🔲 ";
};

const BrandPage = ({ brand, onBack, onBrandClick }) => {
  const [activeTab, setActiveTab] = useState("CARS");
  const [expanded, setExpanded] = useState(false);

  const data = brandsData[brand] || brandsData["Maruti Suzuki"];

  return (
    <div className="brand-page">
      <Navbar />

      {/* Ad Banner */}
      <div className="brand-ad-banner">
        <div className="brand-ad-placeholder">
          📢 ADVERTISEMENT — Check Latest Offers on {brand} Cars
        </div>
      </div>

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
              <span>{data.rating}/5</span>
              <span className="rating-star">⭐</span>
              <span>| {data.reviews} reviews</span>
            </div>
          </div>

          {/* Description */}
          <div className="brand-desc-box">
            <p className={expanded ? "" : "collapsed"}>{data.description}</p>
            <span className="read-more-link" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Read Less" : "Read More"}
            </span>
          </div>

          {/* Models */}
          <div className="brand-models-header">
            <h2>{brand} car models</h2>
            <span className="change-brand-btn" onClick={onBack}>
              ✏️ Change Brand
            </span>
          </div>

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
                  {car.price}
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
              <button className="heart-btn">🤍</button>
            </div>
          ))}

        </div>

        {/* Sidebar */}
        <aside className="brand-sidebar">

          {/* Popular Brands */}
          <div className="brand-sidebar-card">
            <h3>Popular brands</h3>
            <div className="sb-brands-grid">
              {sidebarBrands.map((b, i) => (
                <div
                  key={i}
                  className="sb-brand-item"
                  onClick={() => onBrandClick && onBrandClick(b.name)}
                >
                  <img src={b.logo} alt={b.name} />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discontinued Cars */}
          {data.discontinuedModels && data.discontinuedModels.length > 0 && (
            <div className="brand-sidebar-card">
              <h3>Discontinued {brand} cars</h3>
              {data.discontinuedModels.map((car, i) => (
                <div key={i} className="disc-car-item">
                  <div className="disc-car-thumb"></div>
                  <div className="disc-car-name">{car.name}</div>
                  <div className="disc-car-price">Starting at {car.startingPrice}</div>
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