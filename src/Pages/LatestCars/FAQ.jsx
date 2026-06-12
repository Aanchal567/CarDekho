import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  { q: "Q ) WHAT ARE THE NEW CAR LAUNCHES IN INDIA?", a: "Some of the latest car launches in India include Tata Tiago, Tata Tiago EV, Toyota Urban Cruiser EBELLA, Honda City, and Mercedes-Benz GLE." },
  { q: "Q ) WHAT ARE THE LATEST SUV CARS IN INDIA?", a: "The latest SUV cars in India include Tata Harrier, Tata Safari, Range Rover Sport, Mercedes-Benz GLE, and MG Majestor." },
  { q: "Q ) WHAT ARE THE LATEST HATCHBACK CARS IN INDIA?", a: "The latest hatchback cars in India include Tata Altroz, Tata Tiago, Mini Cooper S, and Nissan Gravite." },
  { q: "Q ) WHAT ARE THE LATEST SEDAN CARS IN INDIA?", a: "The latest sedan cars in India include Honda City, BMW M440i, and Mercedes-Benz GLE." },
  { q: "Q ) WHAT ARE THE LATEST EV CARS IN INDIA?", a: "The latest EV cars in India include Tata Tiago EV, Toyota Urban Cruiser EBELLA with 543 km range, and various other electric models." },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-section">
      <h2>Latest Car FAQs</h2>
      {faqs.map((faq, i) => (
        <div key={i}>
          <div className="faq-item" onClick={() => setOpen(open === i ? null : i)}>
            <span>{faq.q}</span>
            <span className="faq-icon">{open === i ? "−" : "+"}</span>
          </div>
          {open === i && <div className="faq-answer">{faq.a}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;