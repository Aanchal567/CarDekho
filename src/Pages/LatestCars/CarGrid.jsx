import React, { useState } from "react";
import "./CarGrid.css";

import car1 from "../../assets/car1.jpg";
import car2 from "../../assets/car2.jpg";
import car3 from "../../assets/car3.jpg";
import car4 from "../../assets/car4.jpg";
import car5 from "../../assets/car5.jpg";
import car6 from "../../assets/car6.jpg";
import car7 from "../../assets/car7.jpg";
import car8 from "../../assets/car8.jpg";
import car9 from "../../assets/car9.jpg";
import car10 from "../../assets/car10.jpg";
import car11 from "../../assets/car11.jpg";
import car12 from "../../assets/car12.jpg";
import car13 from "../../assets/car13.jpg";
import car14 from "../../assets/car14.jpg";
import car15 from "../../assets/car15.jpg";

const cars = [
  { name: "Tata Tiago", price: "₹4.70 - 8.55 Lakh*", spec: "1199 cc • Petrol", badge: "Facelift", variants: "20 Variants Launched: May 30, 2026", hasOffer: true, img: car1 },
  { name: "Toyota Urban Cruiser EBELLA", price: "₹23.60 Lakh*", spec: "543 km • Electric • 171.65 bhp", badge: "Electric", variants: "1 Variant Launched: May 29, 2026", hasOffer: false, img: car2 },
  { name: "Tata Tiago EV", price: "₹6.99 - 9.99 Lakh*", spec: "285 km • Electric", badge: "Electric", variants: "4 Variants Launched: May 28, 2026", hasOffer: true, img: car3 },
  { name: "MG Majestor", price: "₹40.99 - 44.99 Lakh*", spec: "1996 cc • Diesel", badge: "Facelift", variants: "3 Variants Launched: May 27, 2026", hasOffer: false, img: car4 },
  { name: "Honda City", price: "₹12 - 21 Lakh*", spec: "17.77 kmpl • 1498 cc • Petrol", badge: "Facelift", variants: "8 Variants Launched: May 22, 2026", hasOffer: false, img: car5 },
  { name: "Mercedes-Benz GLE", price: "₹1 - 1.17 Cr*", spec: "2999 cc • Petrol", badge: "New Variant", variants: "2 Variants Launched: May 21, 2026", hasOffer: true, img: car6 },
  { name: "Mercedes-Benz GLS", price: "₹1.32 - 1.43 Cr*", spec: "2999 cc • Petrol", badge: "New Variant", variants: "2 Variants Launched: May 21, 2026", hasOffer: true, img: car7 },
  { name: "Mini Cooper S", price: "₹44.45 - 58.90 Lakh*", spec: "1998 cc • Petrol", badge: "New Variant", variants: "2 Variants Launched: May 19, 2026", hasOffer: false, img: car8 },
  { name: "Range Rover Sport", price: "₹1.38 - 2.35 Cr*", spec: "4395 cc • Petrol", badge: "New Variant", variants: "5 Variants Launched: May 12, 2026", hasOffer: false, img: car9 },
  { name: "Tata Altroz", price: "₹6.30 - 10.77 Lakh*", spec: "1199 cc • CNG", badge: "New Variant", variants: "5 Variants Launched: May 12, 2026", hasOffer: true, img: car10 },
  { name: "Tata Nexon", price: "₹7.37 - 14.32 Lakh*", spec: "17.44 kmpl • 1199 cc • Petrol", badge: "New Variant", variants: "12 Variants Launched: May 08, 2026", hasOffer: true, img: car11 },
  { name: "Tata Harrier", price: "₹12.89 - 25.85 Lakh*", spec: "1956 cc • Diesel", badge: "New Variant", variants: "48 Variants Launched: May 06, 2026", hasOffer: true, img: car12 },
  { name: "Tata Safari", price: "₹13.29 - 26.40 Lakh*", spec: "1956 cc • Diesel", badge: "New Variant", variants: "58 Variants Launched: May 06, 2026", hasOffer: true, img: car13 },
  { name: "Nissan Gravite", price: "₹5.65 - 9.18 Lakh*", spec: "19.3 km/kg • 999 cc • CNG", badge: "New Variant", variants: "13 Variants Launched: May 04, 2026", hasOffer: false, img: car14 },
  { name: "BMW M440i", price: "₹1.09 Cr*", spec: "2998 cc • Petrol", badge: "New Variant", variants: "1 Variant Launched: May 04, 2026", hasOffer: false, img: car15 },
];

const badgeColors = {
  Facelift:      { bg: "#fff3e0", color: "#e65c00", icon: "🔶" },
  Electric:      { bg: "#e8f5e9", color: "#2e7d32", icon: "⚡" },
  "New Variant": { bg: "#f3f3f3", color: "#333",    icon: "🔲" },
};

const CarGrid = () => {
  const [visible, setVisible] = useState(12);

  return (
    <div className="car-grid-section">
      <h2 className="section-title">Newly Launched cars in 2026</h2>
      <p className="section-desc">
        There are 30 cars recently launched in India in last 3 months. Some of the popular latest cars are Tata Tiago, Tata Tiago EV, Tata Nexon, Hyundai Venue and Hyundai Creta.
      </p>
      <span className="read-more">Read More</span>

      <div className="cars-grid">
        {cars.slice(0, visible).map((car, i) => (
          <div key={i} className="car-card">
            <div className="car-image">
              <img src={car.img} alt={car.name} />
              <span
                className="car-badge"
                style={{
                  background: badgeColors[car.badge]?.bg,
                  color: badgeColors[car.badge]?.color,
                }}
              >
                {badgeColors[car.badge]?.icon} {car.badge}
              </span>
            </div>
            <div className="car-info">
              <h3>{car.name}</h3>
              <div className="car-price">
                {car.price}
                {car.hasOffer && <span className="offer-tag">🏷 Offers</span>}
              </div>
              <div className="car-spec">{car.spec}</div>
              <button className="offers-btn">View June Offers</button>
              <div className="variants-info">📅 {car.variants}</div>
            </div>
          </div>
        ))}
      </div>

      {visible < cars.length && (
        <button className="load-more-btn" onClick={() => setVisible(v => v + 3)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CarGrid;