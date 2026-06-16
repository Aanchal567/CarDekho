import React, { useState, useEffect } from "react";
import "./UsedCars.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../LatestCars/Footer";
import TrustBadges from "../LatestCars/TrustBadges";
import CarDetailsModal from "../LatestCars/CarDetailsModal";
import { useApp } from "../../context/AppContext";
import { allCars } from "../../data/carsData";
import { useNavigate, useLocation } from "react-router-dom";
import { Calculator, ShieldCheck, Tag, Heart, MapPin } from "lucide-react";

const UsedCars = () => {
  const { city, selectedCar, setSelectedCar, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Valuation tool states
  const [valBrand, setValBrand] = useState("");
  const [valYear, setValYear] = useState("2020");
  const [valKms, setValKms] = useState("");
  const [valuationResult, setValuationResult] = useState(null);

  // Showroom booking states
  const [bookingDealer, setBookingDealer] = useState(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00 AM - 12:00 PM");
  const [isBooked, setIsBooked] = useState(false);

  // Parse location query if valuation tab requested
  const [activeTab, setActiveTab] = useState("buy");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam === "valuation") {
      setActiveTab("valuation");
    } else if (tabParam === "dealers") {
      setActiveTab("dealers");
    } else {
      setActiveTab("buy");
    }
  }, [location]);

  const handleBookVisit = (e) => {
    e.preventDefault();
    setIsBooked(true);
  };

  // Generate realistic used car listings by discounting new prices
  const getUsedCarsList = () => {
    return allCars.slice(0, 10).map((car, index) => {
      // Calculate a used car price (approx 55% - 75% of new price)
      const basePriceText = car.priceRaw;
      const nums = basePriceText.replace(/[^\d.]/g, " ").trim().split(/\s+/).map(Number);
      const isCr = basePriceText.includes("Cr");
      let minUsed, maxUsed, suffix;

      if (isCr) {
        suffix = "Cr";
        minUsed = (nums[0] * 0.6).toFixed(2);
        maxUsed = (nums.length > 1 ? (nums[1] * 0.6) : (nums[0] * 0.75)).toFixed(2);
      } else {
        suffix = "Lakh";
        minUsed = (nums[0] * 0.65).toFixed(2);
        maxUsed = (nums.length > 1 ? (nums[1] * 0.65) : (nums[0] * 0.78)).toFixed(2);
      }

      return {
        ...car,
        name: `${valYear} ${car.name}`,
        priceUsed: `₹${minUsed} - ${maxUsed} ${suffix}`,
        kms: `${Math.floor(Math.random() * 40000) + 15000} kms`,
        owners: index % 2 === 0 ? "1st Owner" : "2nd Owner",
      };
    });
  };

  const calculateValuation = (e) => {
    e.preventDefault();
    if (!valBrand || !valKms) return;

    // Standard valuation formula simulation
    const baseValue = valBrand === "Maruti Suzuki" ? 650000 : 800000;
    const yearAge = 2026 - Number(valYear); // assume current year is 2026
    const deprecationFactor = Math.pow(0.88, yearAge); // 12% drop per year
    const kmsDriven = Number(valKms);
    const kmPenalty = Math.max(0, (kmsDriven - 15000 * yearAge) * 0.5); // penalty for high kms

    let finalVal = baseValue * deprecationFactor - kmPenalty;
    if (finalVal < 100000) finalVal = 120000; // minimum value

    const rangeMin = Math.round((finalVal * 0.93) / 10000) * 10000;
    const rangeMax = Math.round((finalVal * 1.07) / 10000) * 10000;

    const formatCurrency = (val) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(val);
    };

    setValuationResult({
      min: formatCurrency(rangeMin),
      max: formatCurrency(rangeMax)
    });
  };

  const isLiked = (carName) => {
    return wishlist.some(item => item.name === carName);
  };

  return (
    <div className="used-cars-page">
      <Navbar />

      <div className="used-cars-hero">
        <div className="hero-content">
          <h1>Used Cars in {city}</h1>
          <p>Browse certified second-hand vehicles or get an instant resale valuation for your current car.</p>
        </div>
      </div>

      <div className="used-cars-main">
        <div className="used-tabs">
          <button 
            className={`used-tab-btn ${activeTab === "buy" ? "active" : ""}`}
            onClick={() => setActiveTab("buy")}
          >
            <Tag size={16} /> Buy Used Cars
          </button>
          <button 
            className={`used-tab-btn ${activeTab === "valuation" ? "active" : ""}`}
            onClick={() => setActiveTab("valuation")}
          >
            <Calculator size={16} /> Used Car Valuation
          </button>
          <button 
            className={`used-tab-btn ${activeTab === "dealers" ? "active" : ""}`}
            onClick={() => setActiveTab("dealers")}
          >
            <MapPin size={16} /> Dealership Near Me
          </button>
        </div>

        {activeTab === "buy" && (
          <div className="buy-section">
            <h2 className="section-heading">Certified Second Hand Cars in {city}</h2>
            <p className="section-sub">All vehicles are certified with a 140-point inspection check and 1-year warranty.</p>
            
            <div className="used-cars-grid">
              {getUsedCarsList().map((car, index) => (
                <div 
                  key={index} 
                  className="used-car-card" 
                  onClick={() => setSelectedCar(car)}
                >
                  <div className="uc-card-img">
                    <img src={car.img} alt={car.name} />
                    <span className="uc-badge">Certified</span>
                    <button 
                      className="card-heart"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(car);
                      }}
                    >
                      <Heart 
                        size={18} 
                        color={isLiked(car.name) ? "#f75d34" : "#fff"}
                        fill={isLiked(car.name) ? "#f75d34" : "rgba(0,0,0,0.3)"}
                      />
                    </button>
                  </div>
                  <div className="uc-card-body">
                    <h3>{car.name}</h3>
                    <div className="price-tag">{car.priceUsed}</div>
                    <div className="uc-specs">
                      <span>{car.kms}</span>
                      <span className="bullet">•</span>
                      <span>{car.fuel}</span>
                      <span className="bullet">•</span>
                      <span>{car.owners}</span>
                    </div>
                    <div className="uc-checks">
                      <span className="check-badge"><ShieldCheck size={14} /> Warranty</span>
                      <span className="check-badge"><ShieldCheck size={14} /> 7-Day Return</span>
                    </div>
                    <button className="view-details-btn">View Dealer Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "valuation" && (
          <div className="valuation-section">
            <div className="valuation-container">
              <div className="valuation-form-card">
                <h2>Resale Valuation Calculator</h2>
                <p>Check the fair market value of your vehicle in {city} based on actual dealer pricing records.</p>
                
                <form onSubmit={calculateValuation} className="val-form">
                  <div className="val-form-group">
                    <label>Select Car Brand</label>
                    <select 
                      value={valBrand} 
                      onChange={(e) => setValBrand(e.target.value)} 
                      required
                    >
                      <option value="">Choose Brand</option>
                      <option value="Maruti Suzuki">Maruti Suzuki</option>
                      <option value="Tata">Tata</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Honda">Honda</option>
                      <option value="Toyota">Toyota</option>
                    </select>
                  </div>

                  <div className="val-form-row">
                    <div className="val-form-group">
                      <label>Registration Year</label>
                      <select 
                        value={valYear} 
                        onChange={(e) => setValYear(e.target.value)}
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                      </select>
                    </div>

                    <div className="val-form-group">
                      <label>Kilometers Driven</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 45000" 
                        value={valKms} 
                        onChange={(e) => setValKms(e.target.value)} 
                        min={0}
                        required 
                      />
                    </div>
                  </div>

                  <button type="submit" className="val-submit-btn">Calculate Resale Value</button>
                </form>
              </div>

              <div className="valuation-result-card">
                {valuationResult ? (
                  <div className="val-result-content">
                    <div className="val-gauge">💰</div>
                    <h3>Estimated Value Range</h3>
                    <div className="val-price-range">
                      {valuationResult.min} - {valuationResult.max}
                    </div>
                    <p>Resale price calculated for transactions in <strong>{city}</strong>.</p>
                    
                    <div className="val-cta-box">
                      <h4>Want to sell your car?</h4>
                      <p>Get listed for free on CarDekho and sell directly to 3500+ verified buyers in {city}.</p>
                      <button 
                        className="val-cta-btn"
                        onClick={() => navigate("/sell-my-car")}
                      >
                        Sell Car Now (No Commission)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="val-result-placeholder">
                    <div className="placeholder-icon">📊</div>
                    <h3>Your valuation will appear here</h3>
                    <p>Enter your car specifications on the left and calculate to receive a real-time market value estimation.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "dealers" && (
          <div className="dealers-section">
            <h2 className="section-heading">Certified CarDekho Showrooms in {city}</h2>
            <p className="section-sub">Visit our partner showrooms in {city} for inspected cars, test drives, and financing options.</p>
            
            <div className="dealers-list">
              {[
                { name: `CarDekho TrustMark Store - ${city} Central`, address: "12, Commercial Ring Road, Sector A", rating: "4.8", phone: "1800 200 3000" },
                { name: `CarDekho Gaadi Store - ${city} West Hub`, address: "Plot 89, Automobile Plaza, Industrial Area", rating: "4.7", phone: "1800 200 3001" },
                { name: `Premium Certified Cars - ${city} Bypass`, address: "G-4, Highway Heights, Near Bypass Circle", rating: "4.6", phone: "1800 200 3002" }
              ].map((dealer, idx) => (
                <div key={idx} className="dealer-card">
                  <div className="dealer-card-header">
                    <span className="dealer-icon-bg">🏢</span>
                    <div>
                      <h3>{dealer.name}</h3>
                      <span className="dealer-rating-badge">⭐ {dealer.rating} / 5</span>
                    </div>
                  </div>
                  <div className="dealer-card-body">
                    <p className="dealer-desc-line">📍 {dealer.address}</p>
                    <p className="dealer-desc-line">📞 Call: {dealer.phone}</p>
                    <button 
                      className="book-visit-btn"
                      onClick={() => {
                        setBookingDealer(dealer);
                        setIsBooked(false);
                      }}
                    >
                      Book Showroom Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Visit Booking Dialog */}
            {bookingDealer && (
              <div className="booking-modal-overlay" onClick={() => setBookingDealer(null)}>
                <div className="booking-modal-box" onClick={e => e.stopPropagation()}>
                  <button className="booking-close" onClick={() => setBookingDealer(null)}>✕</button>
                  {isBooked ? (
                    <div className="booking-success-content">
                      <div className="success-icon">✅</div>
                      <h3>Visit Scheduled!</h3>
                      <p>Your visit to <strong>{bookingDealer.name}</strong> has been successfully booked on <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>.</p>
                      <p className="success-sub">A confirmation SMS and showroom address details have been sent to <strong>{bookingPhone}</strong>.</p>
                      <button className="done-btn" onClick={() => { setBookingDealer(null); setIsBooked(false); }}>Done</button>
                    </div>
                  ) : (
                    <form onSubmit={handleBookVisit} className="booking-form">
                      <h3>Schedule visit to</h3>
                      <h4 className="dealer-name-highlight">{bookingDealer.name}</h4>
                      
                      <div className="form-group">
                        <label>Your Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter your full name" 
                          required 
                          value={bookingName} 
                          onChange={e => setBookingName(e.target.value)} 
                        />
                      </div>

                      <div className="form-group">
                        <label>Mobile Number</label>
                        <input 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          required 
                          value={bookingPhone} 
                          onChange={e => setBookingPhone(e.target.value)} 
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Date</label>
                          <input 
                            type="date" 
                            required 
                            min={new Date().toISOString().split("T")[0]} 
                            value={bookingDate} 
                            onChange={e => setBookingDate(e.target.value)} 
                          />
                        </div>
                        <div className="form-group">
                          <label>Time Slot</label>
                          <select 
                            required 
                            value={bookingTime} 
                            onChange={e => setBookingTime(e.target.value)}
                          >
                            <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                            <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                            <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                            <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                          </select>
                        </div>
                      </div>

                      <button type="submit" className="confirm-btn">Confirm Visit</button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <TrustBadges />
      <Footer />

      {selectedCar && <CarDetailsModal />}
    </div>
  );
};

export default UsedCars;
