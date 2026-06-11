import React, { useState } from "react";
import "./BrandPage.css";
import Navbar from "../../Navbar/Navbar";
import BrandSidebar from "./BrandSidebar";

const brandData = {
  "Maruti Suzuki": {
    rating: "4.5",
    reviews: "12.3K",
    description: "Maruti Suzuki has a total of 17 car models available in India right now, including 3 Hatchbacks, 8 SUVs, 2 Sedans and 4 MUVs. The starting price for a Maruti Suzuki car is ₹3.99 Lakh for the Alto K10, while the Invicto is the most expensive model at ₹28.92 Lakh.",
    models: [
      { name: "Swift", price: "₹6.49 - 9.64 Lakh*", fuel: "Petrol", kmpl: "24.82 kmpl" },
      { name: "Brezza", price: "₹8.34 - 14.14 Lakh*", fuel: "Petrol", kmpl: "19.80 kmpl" },
      { name: "Fronx", price: "₹6.85 - 11.98 Lakh*", fuel: "Petrol", kmpl: "21.79 kmpl" },
      { name: "Baleno", price: "₹6.61 - 9.88 Lakh*", fuel: "Petrol", kmpl: "22.94 kmpl" },
      { name: "Ertiga", price: "₹8.69 - 13.07 Lakh*", fuel: "Petrol", kmpl: "20.30 kmpl" },
      { name: "Grand Vitara", price: "₹10.70 - 19.99 Lakh*", fuel: "Petrol/Hybrid", kmpl: "27.97 kmpl" },
    ]
  },
  "Tata": {
    rating: "4.3",
    reviews: "8.1K",
    description: "Tata Motors has a total of 12 car models available in India right now, including 2 Hatchbacks, 7 SUVs, 1 Sedan and 2 EVs. The starting price for a Tata car is ₹4.70 Lakh for the Tiago.",
    models: [
      { name: "Tiago", price: "₹4.70 - 8.55 Lakh*", fuel: "Petrol", kmpl: "19.18 kmpl" },
      { name: "Nexon", price: "₹7.37 - 14.32 Lakh*", fuel: "Petrol", kmpl: "17.44 kmpl" },
      { name: "Harrier", price: "₹12.89 - 25.85 Lakh*", fuel: "Diesel", kmpl: "16.80 kmpl" },
      { name: "Safari", price: "₹13.29 - 26.40 Lakh*", fuel: "Diesel", kmpl: "16.22 kmpl" },
      { name: "Punch", price: "₹5.65 - 10.60 Lakh*", fuel: "Petrol", kmpl: "18.82 kmpl" },
      { name: "Altroz", price: "₹6.30 - 10.77 Lakh*", fuel: "Petrol", kmpl: "19.15 kmpl" },
    ]
  },
  "MG Motor": {
    rating: "4.5",
    reviews: "1.9K",
    description: "MG Motor has a total of 10 car models available in India right now, including 1 Hatchback, 6 SUVs, 2 MUVs and 1 Convertible. The starting price for a MG Motor car is ₹7.50 Lakh for the Comet EV, while the Cyberster is the most expensive model at ₹75 Lakh.",
    models: [
      { name: "Windsor EV", price: "₹13.50 - 15.50 Lakh*", fuel: "Electric", kmpl: "331 km range" },
      { name: "Hector", price: "₹13.99 - 21.99 Lakh*", fuel: "Petrol", kmpl: "15.81 kmpl" },
      { name: "Astor", price: "₹9.98 - 15.95 Lakh*", fuel: "Petrol", kmpl: "17.22 kmpl" },
      { name: "Comet EV", price: "₹7.50 - 9.50 Lakh*", fuel: "Electric", kmpl: "230 km range" },
      { name: "Gloster", price: "₹38.80 - 44.50 Lakh*", fuel: "Diesel", kmpl: "13.96 kmpl" },
      { name: "ZS EV", price: "₹18.98 - 25.20 Lakh*", fuel: "Electric", kmpl: "461 km range" },
    ]
  },
};

const tabs = ["CARS", "DEALERS", "CHARGING STATION", "NEWS", "IMAGES", "VIDEOS", "ROAD TEST", "SERVICE CENTERS"];

const BrandPage = ({ brand = "MG Motor", onBack }) => {
  const [activeTab, setActiveTab] = useState("CARS");
  const [expanded, setExpanded] = useState(false);
  const data = brandData[brand] || brandData["MG Motor"];

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
              <span className="rating-score">{data.rating}/5</span>
              <span className="rating-star">⭐</span>
              <span className="rating-reviews">| {data.reviews} reviews</span>
            </div>
          </div>

          {/* Description */}
          <div className="brand-desc-box">
            <p className={expanded ? "expanded" : "collapsed"}>
              {data.description}
            </p>
            <span className="read-more-btn" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Read Less" : "Read More"}
            </span>
          </div>

          {/* Car Models */}
          <div className="brand-models-header">
            <h2>{brand} car models</h2>
            <span className="change-brand" onClick={onBack}>✏️ Change Brand</span>
          </div>

          <div className="brand-models-grid">
            {data.models.map((car, i) => (
              <div key={i} className="brand-car-card">
                <div className="brand-car-img">
                  <div className="img-placeholder"></div>
                  <span className="heart-icon">🤍</span>
                </div>
                <div className="brand-car-info">
                  <h3>{car.name}</h3>
                  <div className="brand-car-price">{car.price}</div>
                  <div className="brand-car-spec">{car.kmpl} • {car.fuel}</div>
                  <button className="view-offers-btn">View June Offers</button>
                </div>
              </div>
            ))}
          </div>

        </div>

        <BrandSidebar brand={brand} />
      </div>
    </div>
  );
};

export default BrandPage;