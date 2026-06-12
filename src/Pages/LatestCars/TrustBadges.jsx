import React from "react";
import "./TrustBadges.css";

const badges = [
  { icon: "🏆", title: "India's #1",  subtitle: "Largest Auto portal"    },
  { icon: "✨", title: "AI Expert",   subtitle: "Simplify your car search" },
  { icon: "🏷", title: "Offers",      subtitle: "Stay updated pay less"   },
  { icon: "⚖️", title: "Compare",     subtitle: "Decode the right car"    },
];

const TrustBadges = () => (
  <div className="trust-badges">
    {badges.map((b, i) => (
      <div key={i} className="badge-item">
        <span className="badge-icon">{b.icon}</span>
        <div>
          <div className="badge-title">{b.title}</div>
          <div className="badge-subtitle">{b.subtitle}</div>
        </div>
      </div>
    ))}
  </div>
);

export default TrustBadges;