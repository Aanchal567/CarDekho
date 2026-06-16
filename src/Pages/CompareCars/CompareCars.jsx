import React, { useState } from "react";
import "./CompareCars.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../LatestCars/Footer";
import TrustBadges from "../LatestCars/TrustBadges";
import { useApp } from "../../context/AppContext";
import { allCars } from "../../data/carsData";
import { Check, X } from "lucide-react";

const CompareCars = () => {
  const { city } = useApp();
  const [carAId, setCarAId] = useState("");
  const [carBId, setCarBId] = useState("");

  const carA = allCars.find(c => c.name === carAId);
  const carB = allCars.find(c => c.name === carBId);

  // Helper to parse numbers for comparison
  const parseNum = (str = "") => {
    const nums = str.replace(/[^\d.]/g, " ").trim().split(/\s+/).map(Number);
    return nums[0] || 0;
  };

  const getWinner = (key, valA, valB, lowerIsBetter = false) => {
    if (!valA || !valB) return null;
    const numA = parseNum(valA);
    const numB = parseNum(valB);

    if (numA === numB) return null;
    if (lowerIsBetter) {
      return numA < numB ? "A" : "B";
    }
    return numA > numB ? "A" : "B";
  };

  const priceWinner = getWinner("price", carA?.priceRaw, carB?.priceRaw, true);
  const mileageWinner = getWinner("mileage", carA?.kmpl, carB?.kmpl);
  const engineWinner = getWinner("engine", carA?.cc, carB?.cc);
  const powerWinner = getWinner("power", carA?.bhp, carB?.bhp);
  const seatsWinner = getWinner("seats", carA?.seats, carB?.seats);
  const ratingWinner = getWinner("rating", carA?.rating, carB?.rating);

  return (
    <div className="compare-page">
      <Navbar />

      <div className="compare-hero">
        <div className="hero-content">
          <h1>Compare Cars Side-by-Side</h1>
          <p>Confused? Compare price, mileage, engine capacity, power, and seats to find your perfect drive in {city}.</p>
        </div>
      </div>

      <div className="compare-main">
        <div className="compare-selection-row">
          {/* CAR A SELECTOR */}
          <div className="select-box-card">
            <h3>Select Car A</h3>
            <select 
              value={carAId} 
              onChange={(e) => setCarAId(e.target.value)}
              className="car-selector"
            >
              <option value="">Select a Model</option>
              {allCars.map((car, index) => (
                <option key={index} value={car.name}>{car.name}</option>
              ))}
            </select>
            {carA && (
              <div className="selected-car-preview animate-fade">
                <img src={carA.img} alt={carA.name} />
                <h4>{carA.name}</h4>
                <p className="price-tag">{carA.priceRaw}</p>
              </div>
            )}
          </div>

          <div className="vs-badge">VS</div>

          {/* CAR B SELECTOR */}
          <div className="select-box-card">
            <h3>Select Car B</h3>
            <select 
              value={carBId} 
              onChange={(e) => setCarBId(e.target.value)}
              className="car-selector"
            >
              <option value="">Select a Model</option>
              {allCars.map((car, index) => (
                <option key={index} value={car.name}>{car.name}</option>
              ))}
            </select>
            {carB && (
              <div className="selected-car-preview animate-fade">
                <img src={carB.img} alt={carB.name} />
                <h4>{carB.name}</h4>
                <p className="price-tag">{carB.priceRaw}</p>
              </div>
            )}
          </div>
        </div>

        {/* COMPARISON TABLES */}
        {carA && carB ? (
          <div className="compare-results-section animate-slide-up">
            <h2>Detailed Comparison</h2>
            
            <div className="compare-table">
              {/* BRAND ROW */}
              <div className="compare-row header-row">
                <div className="compare-label">Feature</div>
                <div className="compare-val-col font-bold">{carA.name}</div>
                <div className="compare-val-col font-bold">{carB.name}</div>
              </div>

              {/* Price Row */}
              <div className="compare-row">
                <div className="compare-label">Ex-Showroom Price</div>
                <div className={`compare-val-col ${priceWinner === "A" ? "better-spec" : ""}`}>
                  {carA.priceRaw} {priceWinner === "A" && <span className="won-badge">Best Price</span>}
                </div>
                <div className={`compare-val-col ${priceWinner === "B" ? "better-spec" : ""}`}>
                  {carB.priceRaw} {priceWinner === "B" && <span className="won-badge">Best Price</span>}
                </div>
              </div>

              {/* Fuel Row */}
              <div className="compare-row">
                <div className="compare-label">Fuel Type</div>
                <div className="compare-val-col">{carA.fuel}</div>
                <div className="compare-val-col">{carB.fuel}</div>
              </div>

              {/* Mileage Row */}
              <div className="compare-row">
                <div className="compare-label">Mileage / Range</div>
                <div className={`compare-val-col ${mileageWinner === "A" ? "better-spec" : ""}`}>
                  {carA.kmpl} {mileageWinner === "A" && <span className="won-badge">More Efficient</span>}
                </div>
                <div className={`compare-val-col ${mileageWinner === "B" ? "better-spec" : ""}`}>
                  {carB.kmpl} {mileageWinner === "B" && <span className="won-badge">More Efficient</span>}
                </div>
              </div>

              {/* Engine Displacement */}
              <div className="compare-row">
                <div className="compare-label">Engine Size</div>
                <div className={`compare-val-col ${engineWinner === "A" ? "better-spec" : ""}`}>
                  {carA.cc} {engineWinner === "A" && <span className="won-badge">Bigger Engine</span>}
                </div>
                <div className={`compare-val-col ${engineWinner === "B" ? "better-spec" : ""}`}>
                  {carB.cc} {engineWinner === "B" && <span className="won-badge">Bigger Engine</span>}
                </div>
              </div>

              {/* Power Row */}
              <div className="compare-row">
                <div className="compare-label">Max Power</div>
                <div className={`compare-val-col ${powerWinner === "A" ? "better-spec" : ""}`}>
                  {carA.bhp} {powerWinner === "A" && <span className="won-badge">More Power</span>}
                </div>
                <div className={`compare-val-col ${powerWinner === "B" ? "better-spec" : ""}`}>
                  {carB.bhp} {powerWinner === "B" && <span className="won-badge">More Power</span>}
                </div>
              </div>

              {/* Transmission */}
              <div className="compare-row">
                <div className="compare-label">Transmission</div>
                <div className="compare-val-col">{carA.transmission}</div>
                <div className="compare-val-col">{carB.transmission}</div>
              </div>

              {/* Seating Capacity */}
              <div className="compare-row">
                <div className="compare-label">Seating Capacity</div>
                <div className={`compare-val-col ${seatsWinner === "A" ? "better-spec" : ""}`}>
                  {carA.seats} {seatsWinner === "A" && <span className="won-badge">Spacious</span>}
                </div>
                <div className={`compare-val-col ${seatsWinner === "B" ? "better-spec" : ""}`}>
                  {carB.seats} {seatsWinner === "B" && <span className="won-badge">Spacious</span>}
                </div>
              </div>

              {/* User Ratings */}
              <div className="compare-row">
                <div className="compare-label">Rating</div>
                <div className={`compare-val-col ${ratingWinner === "A" ? "better-spec" : ""}`}>
                  ⭐ {carA.rating} / 5
                </div>
                <div className={`compare-val-col ${ratingWinner === "B" ? "better-spec" : ""}`}>
                  ⭐ {carB.rating} / 5
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="compare-placeholder-board">
            <div className="placeholder-board-icon">⚖️</div>
            <h3>Please select two cars to compare</h3>
            <p>Use the drop-down menus above to choose two different car models and compare their specifications side-by-side.</p>
          </div>
        )}
      </div>

      <TrustBadges />
      <Footer />
    </div>
  );
};

export default CompareCars;
