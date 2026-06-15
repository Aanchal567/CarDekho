import React from "react";
import "@fontsource/lato";
import { Routes, Route } from "react-router-dom";
import LatestCars from "./Pages/LatestCars/LatestCars";
import BrandPage from "./Pages/LatestCars/BrandPage/BrandPage";
import SellMyCar from "./Pages/SellCar/SellMyCar";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LatestCars />} />
      <Route path="/latestcars" element={<LatestCars />} />
      <Route path="/:brandSlug-cars" element={<BrandPage />} />
      <Route path="/sell-my-car" element={<SellMyCar/>}/>
    </Routes>
  );
}

export default App;