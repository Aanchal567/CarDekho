import React from "react";
import "./Sidebar.css";

import sideImg1 from "../../assets/side_image1.jpg";
import sideImg2 from "../../assets/side_image2.jpg";
import sideImg3 from "../../assets/side_image3.jpg";
import sideImg4 from "../../assets/side_image4.jpg";
import sideImg5 from "../../assets/side_image5.jpg.avif";
import sideImg6 from "../../assets/side_image6.jpg";
import sideImg7 from "../../assets/side_image7.jpg";
import sideImg8 from "../../assets/side_image8.jpg";
import sideImg9 from "../../assets/side_image9.jpg";
import sideImg10 from "../../assets/side_image10.jpg";
import sideImg11 from "../../assets/side_image11.jpg";

import car1 from "../../assets/car1.jpg";
import car2 from "../../assets/car2.jpg";
import car3 from "../../assets/car3.jpg";
import car4 from "../../assets/car4.jpg";
import car5 from "../../assets/car5.jpg";
import car11 from "../../assets/car11.jpg";
import car12 from "../../assets/car12.jpg";
import car13 from "../../assets/car13.jpg";

const brands = [
  { name: "Maruti Suzuki", logo: sideImg1 },
  { name: "Tata",          logo: sideImg2 },
  { name: "Kia",           logo: sideImg3 },
  { name: "Toyota",        logo: sideImg4 },
  { name: "Hyundai",       logo: sideImg5 },
  { name: "Mahindra",      logo: sideImg6 },
  { name: "Honda",         logo: sideImg7 },
  { name: "MG Motor",      logo: sideImg8 },
  { name: "Skoda",         logo: sideImg9 },
  { name: "Jeep",          logo: sideImg10 },
  { name: "Renault",       logo: sideImg11 },
  { name: "Nissan",        logo: sideImg11 },
];

const popularCars = [
  { name: "Tata Tiago",          price: "₹4.70 - 8.55 Lakh*",   img: car1 },
  { name: "Tata Sierra",         price: "₹11.49 - 21.29 Lakh*", img: car2 },
  { name: "Tata Punch",          price: "₹5.65 - 10.60 Lakh*",  img: car3 },
  { name: "Hyundai Creta",       price: "₹10.91 - 20.06 Lakh*", img: car4 },
  { name: "Maruti Suzuki FRONX", price: "₹6.85 - 11.98 Lakh*",  img: car5 },
];

const upcomingCars = [
  { name: "Skoda Superb 2026",   price: "₹50 Lakh", date: "Jun 14, 2026", img: car11 },
  { name: "Audi Q3 2026",        price: "₹48 Lakh", date: "Jun 15, 2026", img: car12 },
  { name: "Hyundai Inster",      price: "₹12 Lakh", date: "Jun 15, 2026", img: car13 },
  { name: "Nissan Terrano 2025", price: "₹10 Lakh", date: "Jun 15, 2026", img: car1  },
  { name: "Renault Bigster",     price: "₹12 Lakh", date: "Jun 15, 2026", img: car2  },
];

const Sidebar = ({ onBrandClick }) => {
  return (
    <aside className="sidebar">

      {/* Popular Brands */}
      <div className="sidebar-card">
        <h3>Popular car brands</h3>
        <div className="brands-grid">
          {brands.map((b, i) => (
            <div
              key={i}
              className="brand-item"
              onClick={() => onBrandClick && onBrandClick(b.name)}
            >
              <img src={b.logo} alt={b.name} />
              <span>{b.name}</span>
            </div>
          ))}
        </div>
        <div className="view-all">View All Car Brands →</div>
      </div>

      {/* Popular Cars */}
      <div className="sidebar-card">
        <h3>Popular cars</h3>
        {popularCars.map((c, i) => (
          <div key={i} className="sidebar-car-item">
            <img src={c.img} alt={c.name} className="sidebar-car-img" />
            <div>
              <div className="sidebar-car-name">{c.name}</div>
              <div className="sidebar-car-price">{c.price}</div>
            </div>
          </div>
        ))}
        <div className="view-all">View All Best Cars →</div>
      </div>

      {/* Upcoming Cars */}
      <div className="sidebar-card">
        <h3>Upcoming cars</h3>
        {upcomingCars.map((c, i) => (
          <div key={i} className="sidebar-car-item">
            <img src={c.img} alt={c.name} className="sidebar-car-img" />
            <div>
              <div className="sidebar-car-name">{c.name}</div>
              <div className="sidebar-car-price">
                {c.price} <span className="estimated">Estimated</span>
              </div>
              <div className="launch-date">{c.date} Expected Launch</div>
            </div>
          </div>
        ))}
        <div className="view-all">View All Upcoming Cars →</div>
      </div>

    </aside>
  );
};

export default Sidebar;