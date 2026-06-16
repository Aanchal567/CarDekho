import React, { useState } from "react";
import "./FindRightCar.css";
import { useApp } from "../../context/AppContext";

const tabs = ["By Budget", "By Vehicle Type", "By Fuel", "By Seating Capacity", "By Transmission"];
const budgets = ["Under 5 Lakh", "5 - 10 Lakh", "10 - 15 Lakh", "15 - 20 Lakh", "20 - 35 Lakh", "35 - 50 Lakh", "Above 50 Lakh"];
const vehicleTypes = ["Hatchback", "Sedan", "SUV", "MUV", "Luxury", "Electric"];
const fuels = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const seating = ["4 Seater", "5 Seater", "6 Seater", "7 Seater", "8 Seater"];
const transmission = ["Manual", "Automatic", "AMT", "CVT", "DCT"];

const tabContent = { 
  "By Budget": budgets, 
  "By Vehicle Type": vehicleTypes, 
  "By Fuel": fuels, 
  "By Seating Capacity": seating, 
  "By Transmission": transmission 
};

// Map active tab names to filter keys
const tabToFilterKey = {
  "By Budget": "budget",
  "By Vehicle Type": "bodyType",
  "By Fuel": "fuel",
  "By Seating Capacity": "seating",
  "By Transmission": "transmission"
};

const FindRightCar = () => {
  const [activeTab, setActiveTab] = useState("By Budget");
  const { activeFilters, setActiveFilters } = useApp();

  const filterKey = tabToFilterKey[activeTab];
  const currentValue = activeFilters[filterKey] || "";

  const handleTagClick = (value) => {
    // If clicking already active tag, toggle it off
    const newValue = currentValue === value ? "" : value;

    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: newValue
    }));

    // Smooth scroll down to listings section
    setTimeout(() => {
      const element = document.getElementById("listings-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="find-right-car">
      <h2>Find the right car</h2>
      <div className="tabs">
        {tabs.map(tab => (
          <span 
            key={tab} 
            className={`tab ${activeTab === tab ? "active" : ""}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="budget-tags">
        {tabContent[activeTab].map(item => (
          <span 
            key={item} 
            className={`budget-tag ${currentValue === item ? "selected" : ""}`}
            onClick={() => handleTagClick(item)}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FindRightCar;