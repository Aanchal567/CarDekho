import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  "Q ) WHAT ARE THE NEW CAR LAUNCHES IN INDIA?",
  "Q ) WHAT ARE THE LATEST SUV CARS IN INDIA?",
  "Q ) WHAT ARE THE LATEST HATCHBACK CARS IN INDIA?",
  "Q ) WHAT ARE THE LATEST SEDAN CARS IN INDIA?",
  "Q ) WHAT ARE THE LATEST EV CARS IN INDIA?",
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq-section">
      <h2>Latest Car FAQs</h2>
      {faqs.map((q, i) => (
        <div key={i} className="faq-item" onClick={() => setOpen(open === i ? null : i)}>
          <span>{q}</span>
          <span className="faq-icon">{open === i ? "−" : "+"}</span>
        </div>
      ))}
    </div>
  );
};

export default FAQ;