import React, { useState, useEffect } from "react";
import "./CarDetailsModal.css";
import { useApp } from "../../context/AppContext";
import { X, Calendar, User, Phone, CheckCircle, Calculator, Info, Gift, Car } from "lucide-react";

const CarDetailsModal = () => {
  const { selectedCar, setSelectedCar, city } = useApp();
  const [activeTab, setActiveTab] = useState("specs");

  // Reset active tab when a new car is selected
  useEffect(() => {
    setActiveTab("specs");
  }, [selectedCar]);

  if (!selectedCar) return null;

  // Parse car price to get numerical value for EMI default
  const getParsedPrice = (priceText) => {
    if (!priceText) return 800000;
    const nums = priceText.replace(/[^\d.]/g, " ").trim().split(/\s+/).map(Number);
    const isCr = priceText.includes("Cr");
    const factor = isCr ? 10000000 : 100000;
    const val = nums[0] || 8;
    return Math.round(val * factor);
  };

  return (
    <div className="car-modal-overlay" onClick={() => setSelectedCar(null)}>
      <div className="car-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="car-modal-close" onClick={() => setSelectedCar(null)}>
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="car-modal-header">
          <div className="car-header-image">
            <img src={selectedCar.img} alt={selectedCar.name} />
          </div>
          <div className="car-header-info">
            {selectedCar.badge && (
              <span className="car-modal-badge">{selectedCar.badge}</span>
            )}
            <h2>{selectedCar.name}</h2>
            <div className="car-modal-rating">
              <span className="modal-rating-num">{selectedCar.rating} ⭐</span>
              <span className="modal-reviews-num">({selectedCar.reviews} reviews)</span>
            </div>
            <p className="car-modal-price">{selectedCar.priceRaw}</p>
            <p className="car-modal-sub-price">*Estimated Ex-Showroom Price in {city}</p>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="car-modal-tabs">
          <button 
            className={`modal-tab-btn ${activeTab === "specs" ? "active" : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            <Info size={16} /> Key Specs
          </button>
          <button 
            className={`modal-tab-btn ${activeTab === "emi" ? "active" : ""}`}
            onClick={() => setActiveTab("emi")}
          >
            <Calculator size={16} /> EMI Calculator
          </button>
          <button 
            className={`modal-tab-btn ${activeTab === "offers" ? "active" : ""}`}
            onClick={() => setActiveTab("offers")}
          >
            <Gift size={16} /> June Offers
          </button>
          <button 
            className={`modal-tab-btn ${activeTab === "test-drive" ? "active" : ""}`}
            onClick={() => setActiveTab("test-drive")}
          >
            <Car size={16} /> Book Test Drive
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="car-modal-content">
          {activeTab === "specs" && <SpecsTab car={selectedCar} />}
          {activeTab === "emi" && <EMICalculatorTab basePrice={getParsedPrice(selectedCar.priceRaw)} />}
          {activeTab === "offers" && <OffersTab car={selectedCar} />}
          {activeTab === "test-drive" && <TestDriveTab carName={selectedCar.name} city={city} />}
        </div>
      </div>
    </div>
  );
};

/* ── SPECS TAB ── */
const SpecsTab = ({ car }) => (
  <div className="modal-tab-specs">
    <h3>Technical Specifications</h3>
    <div className="specs-grid">
      <div className="spec-card">
        <span className="spec-label">Engine / Battery</span>
        <span className="spec-value">{car.cc || "N/A"}</span>
      </div>
      <div className="spec-card">
        <span className="spec-label">Max Power</span>
        <span className="spec-value">{car.bhp || "N/A"}</span>
      </div>
      <div className="spec-card">
        <span className="spec-label">Fuel Type</span>
        <span className="spec-value">{car.fuel || "N/A"}</span>
      </div>
      <div className="spec-card">
        <span className="spec-label">Mileage / Range</span>
        <span className="spec-value">{car.kmpl || "N/A"}</span>
      </div>
      <div className="spec-card">
        <span className="spec-label">Transmission</span>
        <span className="spec-value">{car.transmission || "N/A"}</span>
      </div>
      <div className="spec-card">
        <span className="spec-label">Seating Capacity</span>
        <span className="spec-value">{car.seats || "N/A"}</span>
      </div>
    </div>
    <div className="specs-description">
      <h4>About {car.name}</h4>
      <p>{car.description}</p>
    </div>
  </div>
);

/* ── EMI CALCULATOR TAB ── */
const EMICalculatorTab = ({ basePrice }) => {
  const [loanAmount, setLoanAmount] = useState(Math.round(basePrice * 0.8));
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const P = loanAmount;
    const r = (interestRate / 12) / 100;
    const n = tenure * 12;

    if (r === 0) {
      setEmi(P / n);
      setTotalInterest(0);
      return;
    }

    const calculatedEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const calculatedTotalInterest = (calculatedEmi * n) - P;

    setEmi(Math.round(calculatedEmi));
    setTotalInterest(Math.round(calculatedTotalInterest));
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="modal-tab-emi">
      <h3>Estimate your monthly EMI</h3>
      <div className="emi-calculator-layout">
        <div className="emi-sliders">
          <div className="slider-group">
            <div className="slider-labels">
              <span>Loan Amount</span>
              <span className="highlight-value">{formatCurrency(loanAmount)}</span>
            </div>
            <input 
              type="range" 
              min={100000} 
              max={Math.round(basePrice * 1.2)} 
              step={10000}
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <div className="slider-minmax">
              <span>₹1 Lakh</span>
              <span>{formatCurrency(basePrice * 1.2)}</span>
            </div>
          </div>

          <div className="slider-group">
            <div className="slider-labels">
              <span>Interest Rate (%)</span>
              <span className="highlight-value">{interestRate}%</span>
            </div>
            <input 
              type="range" 
              min={5} 
              max={15} 
              step={0.1}
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <div className="slider-minmax">
              <span>5%</span>
              <span>15%</span>
            </div>
          </div>

          <div className="slider-group">
            <div className="slider-labels">
              <span>Tenure (Years)</span>
              <span className="highlight-value">{tenure} Years</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={7} 
              step={1}
              value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
            />
            <div className="slider-minmax">
              <span>1 Year</span>
              <span>7 Years</span>
            </div>
          </div>
        </div>

        <div className="emi-results">
          <div className="emi-result-card">
            <span className="result-label">Monthly EMI</span>
            <span className="result-value emi-amount">{formatCurrency(emi)}</span>
          </div>
          <div className="emi-breakdown">
            <div className="breakdown-row">
              <span>Principal Amount:</span>
              <span className="breakdown-val">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="breakdown-row">
              <span>Total Interest Cost:</span>
              <span className="breakdown-val">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="breakdown-row total-row">
              <span>Total Cost (Prin + Int):</span>
              <span className="breakdown-val">{formatCurrency(loanAmount + totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── OFFERS TAB ── */
const OffersTab = ({ car }) => {
  const isElectric = car.fuel.toLowerCase().includes("electric");
  return (
    <div className="modal-tab-offers">
      <h3>Exclusive June Offers & Benefits</h3>
      <p className="offers-sub">Available at authorized dealers until June 30, 2026</p>
      
      <div className="offers-list">
        <div className="offer-item">
          <div className="offer-badge green">CASH DISCOUNT</div>
          <div className="offer-details">
            <h4>Save up to ₹25,000 on select variants</h4>
            <p>Direct discount applied on the ex-showroom billing price.</p>
          </div>
        </div>

        <div className="offer-item">
          <div className="offer-badge blue">EXCHANGE BONUS</div>
          <div className="offer-details">
            <h4>Exchange Bonus up to ₹15,000</h4>
            <p>Exchange your old car and get additional valuation bonuses.</p>
          </div>
        </div>

        <div className="offer-item">
          <div className="offer-badge purple">CORPORATE DISCOUNT</div>
          <div className="offer-details">
            <h4>Corporate Benefit of ₹5,000</h4>
            <p>Available for government employees and select corporate entities.</p>
          </div>
        </div>

        {isElectric && (
          <div className="offer-item">
            <div className="offer-badge electric-color">EV SUBSIDY</div>
            <div className="offer-details">
              <h4>State Government EV Subsidy</h4>
              <p>Additional battery tax exemption benefits up to ₹50,000 based on state policies.</p>
            </div>
          </div>
        )}
      </div>

      <div className="offer-disclaimer">
        *Disclaimer: Discounts and offers may vary by city, dealer availability, and model variants. Please confirm with your local showroom.
      </div>
    </div>
  );
};

/* ── TEST DRIVE TAB ── */
const TestDriveTab = ({ carName, city }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="test-drive-success">
        <CheckCircle size={56} color="#2e7d32" />
        <h3>Booking Confirmed!</h3>
        <p>
          Congratulations, your test drive for <strong>{carName}</strong> in <strong>{city}</strong> has been successfully scheduled on <strong>{date}</strong>.
        </p>
        <p className="success-sub text-center">
          Our partner dealer in {city} will contact you at <strong>{phone}</strong> within 24 hours to confirm the timing and exact showroom details.
        </p>
      </div>
    );
  }

  return (
    <div className="modal-tab-test-drive">
      <h3>Book a Free Test Drive</h3>
      <p className="test-drive-sub">Request a home test drive or schedule a visit to the dealer showroom nearest to you in {city}.</p>
      
      <form className="test-drive-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label><User size={16} /> Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label><Phone size={16} /> Phone Number</label>
          <input 
            type="tel" 
            placeholder="Enter your mobile number" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label><Calendar size={16} /> Preferred Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            min={new Date().toISOString().split("T")[0]}
            required 
          />
        </div>

        <button type="submit" className="test-drive-submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default CarDetailsModal;
