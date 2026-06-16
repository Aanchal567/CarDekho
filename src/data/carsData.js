import brandsData from "./brandsData.json";

// Import images
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.jpg";
import car6 from "../assets/car6.jpg";
import car7 from "../assets/car7.jpg";
import car8 from "../assets/car8.jpg";
import car9 from "../assets/car9.jpg";
import car10 from "../assets/car10.jpg";
import car11 from "../assets/car11.jpg";
import car12 from "../assets/car12.jpg";
import car13 from "../assets/car13.jpg";
import car14 from "../assets/car14.jpg";
import car15 from "../assets/car15.jpg";

import logoMaruti from "../assets/side_image1.jpg";
import logoTata from "../assets/side_image2.jpg";
import logoKia from "../assets/side_image3.jpg";
import logoToyota from "../assets/side_image4.jpg";
import logoHyundai from "../assets/side_image5.jpg.avif";
import logoMahindra from "../assets/side_image6.jpg";
import logoHonda from "../assets/side_image7.jpg";
import logoMG from "../assets/side_image8.jpg";
import logoSkoda from "../assets/side_image9.jpg";
import logoJeep from "../assets/side_image10.jpg";
import logoRenault from "../assets/side_image11.jpg";
import logoNissan from "../assets/side_image11.jpg";

const carImages = [
  car1, car2, car3, car4, car5, car6, car7, car8, car9, car10, car11, car12, car13, car14, car15
];

export const brandLogos = {
  "Maruti Suzuki": logoMaruti,
  "Tata": logoTata,
  "Kia": logoKia,
  "Toyota": logoToyota,
  "Hyundai": logoHyundai,
  "Mahindra": logoMahindra,
  "Honda": logoHonda,
  "MG Motor": logoMG,
  "Skoda": logoSkoda,
  "Jeep": logoJeep,
  "Renault": logoRenault,
  "Nissan": logoNissan,
};

// Compile all cars from json and add extra cars (luxury/custom brands)
const buildCarsList = () => {
  const list = [];
  let imgIndex = 0;

  // Process standard brand models
  Object.entries(brandsData).forEach(([brandName, brandInfo]) => {
    brandInfo.models.forEach((model) => {
      // Calculate a semi-predictable image index based on name hash or round-robin
      const img = carImages[imgIndex % carImages.length];
      imgIndex++;

      list.push({
        name: model.name,
        brand: brandName,
        price: model.price.replace("*", ""),
        priceRaw: model.price,
        fuel: model.fuel,
        transmission: model.transmission,
        cc: model.cc,
        bhp: model.bhp,
        seats: model.seats,
        badge: model.badge || "",
        img: img,
        hasOffer: Math.random() > 0.4,
        variants: `${Math.floor(Math.random() * 20) + 2} Variants`,
        launchDate: `Launched: May ${Math.floor(Math.random() * 28) + 1}, 2026`,
        rating: brandInfo.rating,
        reviews: brandInfo.reviews,
        description: `${model.name} is a high-performance ${model.fuel} car featuring ${model.transmission} transmission and standard safety ratings.`
      });
    });
  });

  // Add luxury and custom models from the home page
  const extraCars = [
    {
      name: "Mercedes-Benz GLE",
      brand: "Mercedes-Benz",
      price: "₹1.00 - 1.17 Cr",
      priceRaw: "₹1.00 - 1.17 Cr*",
      fuel: "Petrol/Diesel",
      transmission: "Automatic",
      cc: "2999 cc",
      bhp: "362 bhp",
      seats: "5 Seats",
      badge: "New Variant",
      img: car6,
      hasOffer: true,
      variants: "2 Variants",
      launchDate: "Launched: May 21, 2026",
      rating: "4.7",
      reviews: "154",
      description: "Experience premium luxury and power with the iconic Mercedes-Benz GLE SUV."
    },
    {
      name: "Mercedes-Benz GLS",
      brand: "Mercedes-Benz",
      price: "₹1.32 - 1.43 Cr",
      priceRaw: "₹1.32 - 1.43 Cr*",
      fuel: "Petrol/Diesel",
      transmission: "Automatic",
      cc: "2999 cc",
      bhp: "381 bhp",
      seats: "7 Seats",
      badge: "New Variant",
      img: car7,
      hasOffer: true,
      variants: "2 Variants",
      launchDate: "Launched: May 21, 2026",
      rating: "4.8",
      reviews: "98",
      description: "The S-Class of SUVs. The Mercedes-Benz GLS offers ultimate comfort and space for seven."
    },
    {
      name: "Mini Cooper S",
      brand: "Mini",
      price: "₹44.45 - 58.90 Lakh",
      priceRaw: "₹44.45 - 58.90 Lakh*",
      fuel: "Petrol",
      transmission: "Automatic",
      cc: "1998 cc",
      bhp: "189 bhp",
      seats: "4 Seats",
      badge: "New Variant",
      img: car8,
      hasOffer: false,
      variants: "2 Variants",
      launchDate: "Launched: May 19, 2026",
      rating: "4.5",
      reviews: "45",
      description: "Sporty, agile, and full of character. The Mini Cooper S is the ultimate hot hatch."
    },
    {
      name: "Range Rover Sport",
      brand: "Land Rover",
      price: "₹1.38 - 2.35 Cr",
      priceRaw: "₹1.38 - 2.35 Cr*",
      fuel: "Petrol/Diesel/Hybrid",
      transmission: "Automatic",
      cc: "2997 cc",
      bhp: "345 bhp",
      seats: "5 Seats",
      badge: "New Variant",
      img: car9,
      hasOffer: false,
      variants: "5 Variants",
      launchDate: "Launched: May 12, 2026",
      rating: "4.7",
      reviews: "76",
      description: "The Range Rover Sport delivers dynamic luxury and legendary off-road capability."
    },
    {
      name: "BMW M440i",
      brand: "BMW",
      price: "₹1.09 Cr",
      priceRaw: "₹1.09 Cr*",
      fuel: "Petrol",
      transmission: "Automatic",
      cc: "2998 cc",
      bhp: "382 bhp",
      seats: "4 Seats",
      badge: "New Variant",
      img: car15,
      hasOffer: false,
      variants: "1 Variant",
      launchDate: "Launched: May 04, 2026",
      rating: "4.6",
      reviews: "60",
      description: "Sporty driving dynamics and exceptional design make the BMW M440i Coupe stand out."
    }
  ];

  return [...list, ...extraCars];
};

export const allCars = buildCarsList();

// Helper to filter cars based on options
export const filterCarsData = (filters, searchStr = "") => {
  return allCars.filter((car) => {
    // Search string matching (brand or model name)
    if (searchStr.trim() !== "") {
      const query = searchStr.toLowerCase();
      const matchName = car.name.toLowerCase().includes(query);
      const matchBrand = car.brand.toLowerCase().includes(query);
      if (!matchName && !matchBrand) return false;
    }

    // Brand filter
    if (filters.brand && filters.brand.toLowerCase() !== "select brand") {
      if (car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }
    }

    // Body Type / Style filter
    if (filters.bodyType && filters.bodyType.toLowerCase() !== "select style") {
      const typeLower = filters.bodyType.toLowerCase();
      // Simple mapping: Hatchback, Sedan, SUV, MUV, Electric, Luxury
      if (typeLower === "electric") {
        if (car.fuel.toLowerCase() !== "electric") return false;
      } else if (typeLower === "luxury") {
        // Luxury brands or high price
        const priceNum = parseFloat(car.price.replace(/[^\d.]/g, ""));
        const isCr = car.price.includes("Cr");
        const isLuxuryBrand = ["mercedes-benz", "bmw", "land rover", "jeep"].includes(car.brand.toLowerCase());
        if (!isLuxuryBrand && !(isCr || priceNum > 30)) return false;
      } else {
        // Match approximate details
        const detailsText = (car.name + " " + car.description).toLowerCase();
        if (!detailsText.includes(typeLower) && car.seats.toLowerCase() !== typeLower) {
          // If body type is SUV and seats/desc doesn't match
          if (typeLower === "suv" && !detailsText.includes("suv") && !detailsText.includes("crossover")) return false;
          if (typeLower === "sedan" && !detailsText.includes("sedan") && !car.name.includes("City") && !car.name.includes("Dzire") && !car.name.includes("Slavia")) return false;
          if (typeLower === "hatchback" && !detailsText.includes("hatchback") && !car.name.includes("Swift") && !car.name.includes("Tiago") && !car.name.includes("Baleno") && !car.name.includes("Altroz")) return false;
          if (typeLower === "muv" && !detailsText.includes("muv") && !car.name.includes("Ertiga") && !car.name.includes("Triber") && !car.name.includes("Carens")) return false;
        }
      }
    }

    // Fuel filter
    if (filters.fuel) {
      if (!car.fuel.toLowerCase().includes(filters.fuel.toLowerCase())) return false;
    }

    // Transmission filter
    if (filters.transmission) {
      if (!car.transmission.toLowerCase().includes(filters.transmission.toLowerCase())) return false;
    }

    // Seating filter
    if (filters.seating) {
      // e.g., "5 Seater" or "5 Seats"
      const capacityNum = filters.seating.split(" ")[0]; // "5"
      if (!car.seats.includes(capacityNum)) return false;
    }

    // Budget filter
    if (filters.budget) {
      // Parse budget e.g., "5 - 10 Lakh", "Under 5 Lakh", "Above 1 Crore"
      const priceText = car.price; // e.g. "₹6.85 - 11.98 Lakh" or "₹1.09 Cr"
      const priceNums = priceText.replace(/[^\d.]/g, " ").trim().split(/\s+/).map(Number);
      const isCr = priceText.includes("Cr");
      const minPrice = priceNums[0];
      const maxPrice = priceNums.length > 1 ? priceNums[1] : minPrice;

      const budgetStr = filters.budget.toLowerCase();

      if (budgetStr.includes("under 5 lakh") || budgetStr === "1 - 5 lakh") {
        if (isCr) return false;
        if (minPrice > 5) return false;
      } else if (budgetStr.includes("5 - 10 lakh")) {
        if (isCr) return false;
        // overlap check
        if (maxPrice < 5 || minPrice > 10) return false;
      } else if (budgetStr.includes("10 - 15 lakh")) {
        if (isCr) return false;
        if (maxPrice < 10 || minPrice > 15) return false;
      } else if (budgetStr.includes("15 - 20 lakh")) {
        if (isCr) return false;
        if (maxPrice < 15 || minPrice > 20) return false;
      } else if (budgetStr.includes("20 - 35 lakh") || budgetStr.includes("20 - 50 lakh")) {
        if (isCr) return false;
        if (maxPrice < 20 || minPrice > 50) return false;
      } else if (budgetStr.includes("35 - 50 lakh")) {
        if (isCr) return false;
        if (maxPrice < 35 || minPrice > 50) return false;
      } else if (budgetStr.includes("50 lakh - 1 crore")) {
        if (isCr) {
          if (minPrice > 1) return false;
        } else {
          if (maxPrice < 50) return false;
        }
      } else if (budgetStr.includes("above 1 crore")) {
        if (!isCr) return false;
        if (maxPrice < 1) return false;
      }
    }

    return true;
  });
};
