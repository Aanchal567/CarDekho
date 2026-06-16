import { useState } from "react";
import "./SellMyCar.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../LatestCars/Footer";
import thumbsup from "../../assets/thumbs_up.jpg";
import { useApp } from "../../context/AppContext";

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sell-faq-item" onClick={() => setOpen(!open)}>
      <div className="faq-row">
        <span>{question}</span>
        <span>{open ? "−" : "+"}</span>
      </div>
      {open && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

const SellMyCar = () => {
  const { city } = useApp();

  // Form states
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2020");
  const [kms, setKms] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSellSubmit = (e) => {
    e.preventDefault();
    if (!brand || !model || !kms || !expectedPrice || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setBrand("");
    setModel("");
    setYear("2020");
    setKms("");
    setExpectedPrice("");
    setPhone("");
    setIsSuccess(false);
  };

  return (
    <>
    <Navbar/>
      {/* SELL HERO SECTION WITH FORM */}
      <div className="sell-hero-section">
        <div className="sell-hero-inner">
          <div className="sell-hero-left">
            <h1>Sell your car at the <br /><span className="accent-color">Best Price</span> from home</h1>
            <p className="sell-hero-desc">Over 3.5 Lakh+ cars sold. Get 100% free listing visibility, instant online valuation, and complete documentation assistance in {city}.</p>
            
            <div className="sell-bullets">
              <div className="bullet-item">
                <span className="bullet-icon">💵</span>
                <div>
                  <h4>Zero Commission Fees</h4>
                  <p>You keep 100% of the sale price. No hidden charges.</p>
                </div>
              </div>
              <div className="bullet-item">
                <span className="bullet-icon">⚡</span>
                <div>
                  <h4>Instant Buyer Offers</h4>
                  <p>Get inspected by CarDekho trust partners and receive deals in 24 hours.</p>
                </div>
              </div>
              <div className="bullet-item">
                <span className="bullet-icon">📝</span>
                <div>
                  <h4>Free RC Transfer</h4>
                  <p>We handle all documentation transfers and paperwork for free.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sell-hero-right">
            <div className="sell-form-card">
              {isSuccess ? (
                <div className="sell-success-state">
                  <div className="success-checkmark">✅</div>
                  <h3>Listing Published!</h3>
                  <p>Congratulations, your <strong>{year} {brand} {model}</strong> is now live on CarDekho Central registry for <strong>{city}</strong>.</p>
                  <p className="success-desc">
                    Our partner buyers in {city} will start matching your listing. We will send you buyer offer updates via SMS and calls at <strong>{phone}</strong>.
                  </p>
                  <button className="sell-another-btn" onClick={handleResetForm}>
                    List Another Car
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSellSubmit} className="sell-car-form">
                  <h3>Get Instant Buyer Matches</h3>
                  <p className="form-sub">List your vehicle for free today</p>
                  
                  <div className="form-group-sell">
                    <label>Brand</label>
                    <select value={brand} onChange={e => setBrand(e.target.value)} required>
                      <option value="">Select Brand</option>
                      <option value="Maruti Suzuki">Maruti Suzuki</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Honda">Honda</option>
                      <option value="Tata">Tata</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Mahindra">Mahindra</option>
                    </select>
                  </div>

                  <div className="form-row-sell">
                    <div className="form-group-sell">
                      <label>Model</label>
                      <select value={model} onChange={e => setModel(e.target.value)} required>
                        <option value="">Select Model</option>
                        {brand === "Maruti Suzuki" && (
                          <>
                            <option value="Swift">Swift</option>
                            <option value="Baleno">Baleno</option>
                            <option value="Dzire">Dzire</option>
                          </>
                        )}
                        {brand === "Tata" && (
                          <>
                            <option value="Nexon">Nexon</option>
                            <option value="Tiago">Tiago</option>
                            <option value="Punch">Punch</option>
                          </>
                        )}
                        {brand === "Hyundai" && (
                          <>
                            <option value="Creta">Creta</option>
                            <option value="i20">i20</option>
                            <option value="Exter">Exter</option>
                          </>
                        )}
                        {brand === "Honda" && (
                          <>
                            <option value="City">City</option>
                            <option value="Amaze">Amaze</option>
                          </>
                        )}
                        {brand === "Toyota" && (
                          <>
                            <option value="Fortuner">Fortuner</option>
                            <option value="Innova">Innova</option>
                          </>
                        )}
                        {brand === "Mahindra" && (
                          <>
                            <option value="Thar">Thar</option>
                            <option value="Scorpio">Scorpio</option>
                            <option value="XUV700">XUV700</option>
                          </>
                        )}
                        {!brand && <option value="" disabled>Select Brand First</option>}
                      </select>
                    </div>

                    <div className="form-group-sell">
                      <label>Year</label>
                      <select value={year} onChange={e => setYear(e.target.value)}>
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
                  </div>

                  <div className="form-row-sell">
                    <div className="form-group-sell">
                      <label>KM Driven</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 45000" 
                        value={kms} 
                        onChange={e => setKms(e.target.value)} 
                        min={0}
                        required 
                      />
                    </div>

                    <div className="form-group-sell">
                      <label>Expected Price (Lakhs)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 6.5" 
                        value={expectedPrice} 
                        onChange={e => setExpectedPrice(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group-sell">
                    <label>Mobile Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter mobile number" 
                      value={phone} 
                      onChange={e => setPhone(e.target.value)} 
                      required 
                    />
                  </div>

                  <button type="submit" className="submit-listing-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting Listing..." : "List My Car For Free"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* HOW IT WORKS */}
      <div className="how-works-section">
        <div className="how-works-inner">
          <div className="how-works-left">
            <h2>How CarDekho Works?</h2>

            <div className="how-step">
              <div className="how-step-icon">🚗</div>
              <div>
                <h3>Share Your Car Details</h3>
                <p>Provide accurate details of your car and upload clear, recent photos. This helps potential buyers and increases your chances of receiving the best offer.</p>
              </div>
            </div>

            <div className="how-step">
              <div className="how-step-icon">📋</div>
              <div>
                <h3>List your car for FREE</h3>
                <p>Our team verifies your vehicle details to ensure accuracy. Once approved, your car is listed on our platform for free and shared with interested buyers and verified channel partners.</p>
              </div>
            </div>

            <div className="how-step">
              <div className="how-step-icon">👥</div>
              <div>
                <h3>Connect with Interested Buyers Directly</h3>
                <p>Engage with potential buyers and verified channel partners directly to negotiate a price and finalise the sale.</p>
              </div>
            </div>

            <div className="how-step">
              <div className="how-step-icon">₹</div>
              <div>
                <h3>Sell Your Car with Ease</h3>
                <p>Complete the sale of your car at the agreed price — CarDekho charges no commission fees.</p>
              </div>
            </div>

            <p className="how-works-tagline">
              With CarDekho, selling your car is not just easier — it's smarter.
            </p>
          </div>

          <div className="how-works-right">
            <div className="how-works-img-placeholder">
              <img src={thumbsup} alt="Sell My Car" />
            </div>
          </div>
        </div>
      </div>

      {/* GOOGLE REVIEWS */}
      <div className="reviews-section">
        <div className="reviews-inner">
          <div className="google-rating">
            <span className="g-logo">G</span>
            <span className="g-score">4.8⭐</span>
            <span className="g-total">4.8 of 5</span>
          </div>
          <div className="reviews-grid">
            {[
              { name: "Sai Krishna", stars: 4, avatar: "S", text: "Very good experience dealing with them and it's hassle free..." },
              { name: "nishant lal", stars: 5, avatar: "n", text: "I would like to share an exceptional and seamless experience I h..." },
              { name: "kaushik mishra", stars: 5, avatar: "K", text: "Sold my 6 years old grand i10 car at an awesome price. The enti..." },
            ].map((review, i) => (
              <div key={i} className="review-card">
                <div className="review-top">
                  <div className="review-avatar">{review.avatar}</div>
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div className="review-stars">{"⭐".repeat(review.stars)}</div>
                  </div>
                  <span className="google-icon">G</span>
                </div>
                <p className="review-text">{review.text}</p>
                <span className="read-more-link">Read More</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INVESTORS */}
      <div className="investors-section">
        <h2>Backed by some of the world's most prominent investors</h2>
        <div className="investors-grid">
          {["Google", "SEQUOIA", "HDFC BANK", "AXIS BANK", "Hillhouse Capital"].map((inv, i) => (
            <div key={i} className="investor-item">{inv}</div>
          ))}
        </div>
      </div>

      {/* SELL BY BRAND */}
      <div className="sell-brands-section">
        <div className="sell-brands-box">
          <h2>Sell Cars By Popular Brands</h2>
          {[
            "Sell Used Maruti Suzuki car",
            "Sell Used Hyundai car",
            "Sell Used Honda car",
            "Sell Used Toyota car",
            "Sell Used Mahindra car",
            "Sell Used Tata car",
            "Sell Used Ford car",
            "Sell Used Volkswagen car",
          ].map((brand, i) => (
            <div key={i} className="sell-brand-row">
              <span>{brand}</span>
              <span className="arrow">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="sell-faq-section">
        <h2>Frequently Ask Questions</h2>
        {[
          { q: "Is it free to sell my car in Jaipur", a: "Absolutely! We connect you with buyers for free." },
          { q: "What happens if I receive multiple offers for my car?", a: "You can choose the best offer that suits you." },
          { q: "Am I obligated to accept any offers I receive?", a: "No, you are not obligated to accept any offer." },
          { q: "What if I change my mind about selling my car?", a: "You can withdraw your listing anytime for free." },
          { q: "Is my personal information secure on the platform?", a: "Yes, we take data privacy very seriously." },
          { q: "How long does it take to sell my car?", a: "Most cars sell within 7-14 days on our platform." },
          { q: "What happens if my car doesn't sell?", a: "We will help you reprice and relist your car." },
          { q: "I am a dealer with a fleet of cars. Can I get a better deal?", a: "Yes! Contact our dealer team for special pricing." },
        ].map((faq, i) => (
          <FaqItem key={i} question={faq.q} answer={faq.a} />
        ))}
      </div>

      {/* CITY INFO */}
      <div className="city-section">
        <h2>Sell Used Car in Jaipur</h2>
        <p className="city-desc">
          Khamma Ghani! Jaipur, the pink city, is known for its famous monuments like
          Hawa Mahal, Amer Fort, Jantar Mantar and many more! CarDekho helps you to
          sell your used car right from the comfort of your home and offers you the
          best price for your second hand car, thanks to our network of 3500+ dealers.
        </p>
        <span className="read-more-link">Read More ∨</span>

        <h3 className="top-cities-title">Top Cities</h3>
        <div className="top-cities-grid">
          {[
            "Sell car in Mumbai", "Sell car in New Delhi",
            "Sell car in Gurugram", "Sell car in Faridabad",
            "Sell car in Noida", "Sell car in Ghaziabad",
            "Sell car in Pune", "Sell car in Bangalore",
          ].map((city, i) => (
            <span key={i} className="city-link">{city}</span>
          ))}
        </div>
        <span className="read-more-link">Read More ∨</span>
      </div>

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <span className="bc-home">Home</span>
        <span className="bc-sep"> › </span>
        <span className="bc-current">Sell Car</span>
      </div>
      <Footer/>
    </>
  );
};

export default SellMyCar;
