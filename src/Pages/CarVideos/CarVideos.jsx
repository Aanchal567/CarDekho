import React, { useState, useEffect } from "react";
import "./CarVideos.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../LatestCars/Footer";
import TrustBadges from "../LatestCars/TrustBadges";
import { useApp } from "../../context/AppContext";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const videosList = [
  {
    title: "Maruti Suzuki e Vitara: First Look & Drive Review",
    duration: "12:34",
    reviewer: "CarDekho Expert",
    views: "120K Views",
    thumbnail: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Tata Nexon EV Max vs MG ZS EV Range Test",
    duration: "18:45",
    reviewer: "EV Specialist Review",
    views: "85K Views",
    thumbnail: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Toyota Fortuner Off-Road Trail test in Jaipur",
    duration: "10:15",
    reviewer: "Jaipur Offroad Club",
    views: "210K Views",
    thumbnail: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "New Swift 2026 AMT Real Mileage and Highway Test",
    duration: "15:20",
    reviewer: "Auto Expert India",
    views: "320K Views",
    thumbnail: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Mahindra Thar vs Scorpio N SUV Drag Race",
    duration: "08:50",
    reviewer: "Speed Challengers",
    views: "450K Views",
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Skoda Slavia 1.5 TSI DSG Long Highway Test Drive",
    duration: "14:10",
    reviewer: "Performance Drives India",
    views: "98K Views",
    thumbnail: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

const visualStoriesList = [
  {
    title: "10 Mind-Blowing Features of Maruti Suzuki eVitara",
    cover: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80",
        title: "Suzuki eVitara Global Debut",
        text: "The eVitara is Maruti's first global electric SUV, packing rugged looks and advanced tech."
      },
      {
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80",
        title: "Dual-Motor e-AWD System",
        text: "It will feature Suzuki's new ALLGRIP-e electric AWD system for premium off-road control and torque management."
      },
      {
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
        title: "Premium Tech Cabin",
        text: "A longer wheelbase means spacious passenger room and a modern dual-screen layout with full connected car suite."
      }
    ]
  },
  {
    title: "Tata Punch EV: Five Reasons it is India's Fav EV",
    cover: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80",
        title: "Highly Accessible EV",
        text: "Starting under 11 Lakhs, the Punch EV makes zero-emission city commuting accessible to all buyers."
      },
      {
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
        title: "10.25-inch Floating Screen",
        text: "Equipped with an advanced floating touchscreen layout featuring Arcade.ev apps, maps, and games."
      },
      {
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80",
        title: "5-Star Safety Architecture",
        text: "Built on Tata's acti.ev platform, securing top safety ratings for structure and occupant protection."
      }
    ]
  },
  {
    title: "Mahindra Thar ROXX: Luxury Meets Rugged Offroad",
    cover: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80",
        title: "Family Offroad Ready",
        text: "The Thar ROXX 5-door offers real back doors, generous luggage area, and comfortable seats for five passengers."
      },
      {
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
        title: "Massive Panoramic Skyroof",
        text: "Enjoy ultimate airiness and sky view right from your rugged 4x4 off-road cabin."
      },
      {
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80",
        title: "Ventilated Leather Seats",
        text: "Ride in luxury with ventilated front-row seats keeping you cool on hot, long highway drives."
      }
    ]
  },
  {
    title: "Top Upcoming SUV Launches in India (2026/2027)",
    cover: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
        title: "New Hyundai Creta EV",
        text: "Creta's electric version is currently testing, featuring a 450 km range and advanced ADAS level 2."
      },
      {
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80",
        title: "Mahindra XUV.e8 SUV",
        text: "An all-electric SUV based on the popular XUV700, promising a triple-screen dashboard layout."
      },
      {
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80",
        title: "Next-Gen Tata Sierra EV",
        text: "Reborn as a clean electric vehicle retaining the iconic curved glass rear windows of the legacy Sierra."
      }
    ]
  }
];

const CarVideos = () => {
  const { city } = useApp();
  const [activeTab, setActiveTab] = useState("reviews");
  const [playingVideo, setPlayingVideo] = useState(null);
  
  // Visual Story states
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam === "stories") {
      setActiveTab("stories");
    } else {
      setActiveTab("reviews");
    }
  }, [location]);

  const handleTabClick = (tab) => {
    if (tab === "reviews") {
      navigate("/car-videos?tab=reviews");
    } else {
      navigate("/car-videos?tab=stories");
    }
  };

  const handleOpenStory = (story) => {
    setSelectedStory(story);
    setCurrentSlideIdx(0);
  };

  const handleNextSlide = () => {
    if (!selectedStory) return;
    if (currentSlideIdx < selectedStory.slides.length - 1) {
      setCurrentSlideIdx(prev => prev + 1);
    } else {
      // Loop or close
      setSelectedStory(null);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(prev => prev - 1);
    }
  };

  return (
    <div className="videos-page">
      <Navbar />

      <div className="videos-hero">
        <div className="hero-content">
          <h1>Latest Car Video Reviews & Visual Stories</h1>
          <p>Watch road tests, walkarounds, and visual slides near {city}.</p>
        </div>
      </div>

      <div className="videos-main">
        <div className="videos-filter-bar">
          <button 
            className={`filter-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => handleTabClick("reviews")}
          >
            Video Reviews
          </button>
          <button 
            className={`filter-btn ${activeTab === "stories" ? "active" : ""}`}
            onClick={() => handleTabClick("stories")}
          >
            Visual Stories
          </button>
        </div>

        {activeTab === "reviews" ? (
          <div>
            <h2>Expert Review Videos</h2>
            <div className="videos-grid">
              {videosList.map((video, index) => (
                <div key={index} className="video-card" onClick={() => setPlayingVideo(video)}>
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="play-overlay">
                      <Play size={36} color="white" fill="white" />
                    </div>
                    <span className="video-duration">{video.duration}</span>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <div className="video-meta">
                      <span>{video.reviewer}</span>
                      <span className="meta-bullet">•</span>
                      <span>{video.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2>Popular Web Stories</h2>
            <div className="stories-grid">
              {visualStoriesList.map((story, index) => (
                <div key={index} className="story-card" onClick={() => handleOpenStory(story)}>
                  <span className="story-badge">Web Story</span>
                  <img src={story.cover} alt={story.title} className="story-card-img" />
                  <div className="story-card-overlay">
                    <h3>{story.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen video mock modal */}
      {playingVideo && (
        <div className="video-player-modal" onClick={() => setPlayingVideo(null)}>
          <div className="video-player-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-player-btn" onClick={() => setPlayingVideo(null)}>
              <X size={20} />
            </button>
            <div className="iframe-wrapper">
              <iframe
                title={playingVideo.title}
                src={playingVideo.embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="player-details">
              <h3>{playingVideo.title}</h3>
              <p>{playingVideo.reviewer} • {playingVideo.views}</p>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen visual web story player */}
      {selectedStory && (
        <div className="story-player-modal" onClick={() => setSelectedStory(null)}>
          <div className="story-player-frame" onClick={(e) => e.stopPropagation()}>
            {/* Slide indicators */}
            <div className="story-progress-indicators">
              {selectedStory.slides.map((_, idx) => (
                <div key={idx} className="story-progress-bar">
                  <div 
                    className="story-progress-fill" 
                    style={{ 
                      width: idx < currentSlideIdx ? "100%" : idx === currentSlideIdx ? "100%" : "0%",
                      transition: idx === currentSlideIdx ? "width 5s linear" : "none" 
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button className="story-close-btn" onClick={() => setSelectedStory(null)}>
              <X size={20} />
            </button>

            {/* Slide Content */}
            <img 
              src={selectedStory.slides[currentSlideIdx].image} 
              alt={selectedStory.slides[currentSlideIdx].title} 
              className="story-slide-img" 
            />

            <div className="story-slide-overlay">
              <h2>{selectedStory.slides[currentSlideIdx].title}</h2>
              <p>{selectedStory.slides[currentSlideIdx].text}</p>
            </div>

            {/* Tap Navigation hot-spots on PC / Arrows */}
            <button 
              className="story-nav-btn prev" 
              onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
              disabled={currentSlideIdx === 0}
              style={{ opacity: currentSlideIdx === 0 ? 0.3 : 1 }}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="story-nav-btn next" 
              onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      <TrustBadges />
      <Footer />
    </div>
  );
};

export default CarVideos;
