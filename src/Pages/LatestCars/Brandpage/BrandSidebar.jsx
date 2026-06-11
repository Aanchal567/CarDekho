import React from "react";
import "./BrandPage.css";

const BrandSidebar = ({ brand }) => {
  return (
    <aside className="brand-sidebar">
      <div className="brand-sidebar-card">
        <h3>About {brand}</h3>
        <p className="about-text">
          Explore the full lineup of {brand} cars, compare models, check prices, and find the best deals in your city.
        </p>
      </div>
      <div className="brand-sidebar-card">
        <h3>Popular {brand} Cars</h3>
        {[1,2,3].map(i => (
          <div key={i} className="bs-car-item">
            <div className="bs-car-img"></div>
            <div>
              <div className="bs-car-name">{brand} Model {i}</div>
              <div className="bs-car-price">₹{(i * 5 + 7)}.00 Lakh*</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default BrandSidebar;