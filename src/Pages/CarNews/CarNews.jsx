import React, { useState, useEffect } from "react";
import "./CarNews.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../LatestCars/Footer";
import TrustBadges from "../LatestCars/TrustBadges";
import { useApp } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { allCars } from "../../data/carsData";
import CarDetailsModal from "../LatestCars/CarDetailsModal";

const newsItems = [
  {
    title: "Next-Gen Maruti Suzuki Swift Hybrid Launch Details Leaked",
    desc: "The popular hatchback is set to receive a strong-hybrid variant with a staggering mileage of 35 kmpl, expected to hit showrooms in late 2026.",
    date: "June 15, 2026",
    tag: "News",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Tata Motors Developing Safari EV with AWD capabilities",
    desc: "Tata is testing a dual-motor electric variant of the Safari SUV, aiming for a 550 km range and premium off-road control packages.",
    date: "June 14, 2026",
    tag: "News",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Toyota Urban Cruiser EBELLA Bookings Cross 50K Milestone",
    desc: "Within just a week of launch, the all-electric SUV has registered massive demand, particularly for its long-range 543 km variant.",
    date: "June 12, 2026",
    tag: "News",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Hyundai Creta Facelift Long-Term Review: 10,000 Kms Check",
    desc: "After four months of driving, we analyze Creta's ADAS features, high-speed stability, and real-world fuel efficiency in city conditions.",
    date: "June 10, 2026",
    tag: "Expert Review",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Comparison: Honda Elevate vs Skoda Kushaq in 2026",
    desc: "A thorough comparison analyzing build quality, suspension comfort, cabin noise, and cornering performance on curved roads.",
    date: "June 05, 2026",
    tag: "Expert Review",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Mahindra Thar ROXX 5-Door: First Drive Impression & Off-Road Test",
    desc: "We take the new Thar 5-Door through deep slush, sand dunes, and highway cruising to find out if it is the ultimate family off-roader.",
    date: "June 03, 2026",
    tag: "Expert Review",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "MG Windsor EV User Feedback: High Cabin Comfort, charging specs",
    desc: "Real owners share their charging speed reviews, rear-seat comfort details, and highlight potential areas of software improvement.",
    date: "June 08, 2026",
    tag: "User Review",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Kia Seltos DCT Owner Review after 1 Year: Smooth but Thirsty",
    desc: "Owner reports back with city mileage figures of 9.5 kmpl, praising the gearbox refinement and criticizing the stiff suspension on bumpy city roads.",
    date: "June 04, 2026",
    tag: "User Review",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Tata Punch EV: Why I chose it over Tiago EV - Owner's Perspective",
    desc: "An in-depth review by a city commuter highlighting ground clearance advantages, charging time, and lower maintenance costs.",
    date: "June 02, 2026",
    tag: "User Review",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Top 10 Best Mileage SUVs in India (2026 Edition)",
    desc: "Looking for high fuel efficiency? We list the top compact and mid-size SUVs with diesel and strong-hybrid engines that save fuel.",
    date: "May 28, 2026",
    tag: "Collection",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Best Electric Cars under 15 Lakhs: Tiago EV, Punch EV & More",
    desc: "Our handpicked catalog of budget-friendly EVs offering practical ranges and comfortable rides for daily city commutes.",
    date: "May 25, 2026",
    tag: "Collection",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Top 5 Safest Hatchbacks in India with 5-Star GNCAP Rating",
    desc: "Safety comes first. These five affordable hatchbacks offer standard safety features and high structural crashworthiness.",
    date: "May 20, 2026",
    tag: "Collection",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "How to get maximum battery health on your Electric Vehicle",
    desc: "Avoid charging to 100% every day. Follow these simple expert tips on thermal management and slow charging to extend your EV battery life.",
    date: "May 15, 2026",
    tag: "Tips",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "5 Crucial Tips for Driving Safely in Heavy Monsoon & Water Logging",
    desc: "How to handle aquaplaning, check engine water intake levels, and keep your brakes functioning correctly when driving through flooded roads.",
    date: "May 12, 2026",
    tag: "Tips",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Car Insurance Claim Process: Steps to avoid rejection after an accident",
    desc: "Do not move the vehicle without taking photos. Read this checklist to ensure your insurer approves your claims seamlessly and quickly.",
    date: "May 08, 2026",
    tag: "Tips",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80"
  }
];

const trendingNews = [
  { title: "Next-Gen Swift strong-hybrid variants explained: Mileage of 35 kmpl", tab: "news" },
  { title: "Mahindra Thar ROXX 5-door versus Scorpio N: Best family off-roader?", tab: "expert" },
  { title: "MG Windsor EV long-term owner reviews: High interior comfort points", tab: "user" },
  { title: "Top electric cars in India launching under 15 Lakhs budget in late 2026", tab: "collection" }
];

const CarNews = () => {
  const { city, selectedCar, setSelectedCar } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam === "news" || tabParam === "expert" || tabParam === "user" || tabParam === "collection" || tabParam === "tips") {
      setActiveFilter(tabParam);
    } else {
      setActiveFilter("all");
    }
  }, [location]);

  const handleTabClick = (tab) => {
    if (tab === "all") {
      navigate("/car-news");
    } else {
      navigate(`/car-news?tab=${tab}`);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  const filteredNews = activeFilter === "all" 
    ? newsItems 
    : newsItems.filter(item => {
        if (activeFilter === "news") return item.tag === "News";
        if (activeFilter === "expert") return item.tag === "Expert Review";
        if (activeFilter === "user") return item.tag === "User Review";
        if (activeFilter === "collection") return item.tag === "Collection";
        if (activeFilter === "tips") return item.tag === "Tips";
        return true;
      });

  // Extract trending cars from database for sidebar widget
  let trendingCars = allCars.filter(car => 
    car.name.toLowerCase().includes("swift") || 
    car.name.toLowerCase().includes("nexon") || 
    car.name.toLowerCase().includes("thar")
  ).slice(0, 3);
  if (trendingCars.length === 0) {
    trendingCars = allCars.slice(0, 3);
  }

  return (
    <div className="news-page">
      <Navbar />

      <div className="news-hero">
        <div className="hero-content">
          <h1>Car News & Expert Reviews</h1>
          <p>Read the latest scoops, launch date rumors, first-drive reports, and tips in {city}.</p>
        </div>
      </div>

      <div className="news-main">
        <div className="news-filter-bar">
          <button 
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            All Stories
          </button>
          <button 
            className={`filter-btn ${activeFilter === "news" ? "active" : ""}`}
            onClick={() => handleTabClick("news")}
          >
            News & Top stories
          </button>
          <button 
            className={`filter-btn ${activeFilter === "expert" ? "active" : ""}`}
            onClick={() => handleTabClick("expert")}
          >
            Car Expert Reviews
          </button>
          <button 
            className={`filter-btn ${activeFilter === "user" ? "active" : ""}`}
            onClick={() => handleTabClick("user")}
          >
            User Reviews
          </button>
          <button 
            className={`filter-btn ${activeFilter === "collection" ? "active" : ""}`}
            onClick={() => handleTabClick("collection")}
          >
            Car Collection
          </button>
          <button 
            className={`filter-btn ${activeFilter === "tips" ? "active" : ""}`}
            onClick={() => handleTabClick("tips")}
          >
            Tips & Advice
          </button>
        </div>

        <div className="news-portal-container">
          {/* LEFT AREA: Feed */}
          <div className="news-portal-left">
            {filteredNews.length > 0 ? (
              <>
                {/* ── Featured Top Story Card ── */}
                <div className="featured-news-card">
                  <div className="featured-img-wrapper">
                    <img src={filteredNews[0].image} alt={filteredNews[0].title} />
                    <span className="featured-tag">{filteredNews[0].tag}</span>
                  </div>
                  <div className="featured-content">
                    <span className="featured-date">{filteredNews[0].date}</span>
                    <h2>{filteredNews[0].title}</h2>
                    <p>{filteredNews[0].desc}</p>
                    <span className="read-more-link">Read Full Story →</span>
                  </div>
                </div>

                {/* ── Horizontal list feed for remaining stories ── */}
                {filteredNews.length > 1 && (
                  <div className="news-list-feed">
                    {filteredNews.slice(1).map((item, index) => (
                      <div key={index} className="news-list-item">
                        <div className="news-item-img">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="news-item-content">
                          <span className="news-item-tag">{item.tag}</span>
                          <h3>{item.title}</h3>
                          <p>{item.desc}</p>
                          <div className="news-item-meta">
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="no-news-message">No articles found in this category.</div>
            )}
          </div>

          {/* RIGHT AREA: Sidebar */}
          <div className="news-portal-sidebar">
            {/* Trending Cars Widget */}
            <div className="sidebar-widget">
              <h3>Trending Cars</h3>
              <div className="trending-cars-list">
                {trendingCars.map((car, idx) => (
                  <div key={idx} className="trending-car-row">
                    <div className="t-car-img">
                      <img src={car.img} alt={car.name} />
                    </div>
                    <div className="t-car-info">
                      <h4>{car.name}</h4>
                      <div className="t-car-rating">⭐ {car.rating} ({car.reviews} Reviews)</div>
                      <div className="t-car-price">{car.price}</div>
                    </div>
                    <button className="check-price-btn" onClick={() => setSelectedCar(car)}>
                      Check Price
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular News list */}
            <div className="sidebar-widget">
              <h3>Trending News</h3>
              <div className="trending-news-list">
                {trendingNews.map((item, idx) => (
                  <div key={idx} className="trending-news-row" onClick={() => handleTabClick(item.tab)}>
                    <span className="t-num">0{idx + 1}</span>
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter widget */}
            <div className="sidebar-widget newsletter-widget">
              <h3>Get Car Scoops</h3>
              {isSubscribed ? (
                <div className="newsletter-success">
                  <div className="success-check">✅</div>
                  <h4>Subscription Successful!</h4>
                  <p>We'll send exclusive updates to your email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <p>Get instant spy shots, upcoming launches, and discount scoops in {city}.</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="subscribe-btn">Subscribe Now</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <TrustBadges />
      <Footer />

      {selectedCar && <CarDetailsModal />}
    </div>
  );
};

export default CarNews;
