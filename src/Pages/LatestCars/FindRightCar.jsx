import React, { useState } from "react";
import "./FindRightCar.css";

const tabs = ["By Budget", "By Vehicle Type", "By Fuel", "By Seating Capacity", "By Transmission"];
const budgets = ["1 - 5 Lakh", "5 - 10 Lakh", "10 - 15 Lakh", "15 - 20 Lakh", "20 - 35 Lakh", "35 - 50 Lakh", "50 Lakh - 1 Crore", "Above 1 Crore"];
const vehicleTypes = ["Hatchback", "Sedan", "SUV", "MUV", "Luxury", "Electric"];
const fuels = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const seating = ["4 Seater", "5 Seater", "6 Seater", "7 Seater", "8 Seater"];
const transmission = ["Manual", "Automatic", "AMT", "CVT", "DCT"];

const tabContent = { "By Budget": budgets, "By Vehicle Type": vehicleTypes, "By Fuel": fuels, "By Seating Capacity": seating, "By Transmission": transmission };

const FindRightCar = () => {
  const [activeTab, setActiveTab] = useState("By Budget");
  return (
    <div className="find-right-car">
      <h2>Find the right car</h2>
      <div className="tabs">
        {tabs.map(tab => (
          <span key={tab} className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </span>
        ))}
      </div>
      <div className="budget-tags">
        {tabContent[activeTab].map(item => (
          <span key={item} className="budget-tag">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default FindRightCar;