import React from "react";
import "@fontsource/lato";
import { Routes, Route } from "react-router-dom";
import LatestCars from "./Pages/LatestCars/LatestCars";
import BrandPage from "./Pages/LatestCars/BrandPage/BrandPage";
import SellMyCar from "./Pages/SellCar/SellMyCar";
import NewCars from "./Pages/NewCars/NewCars";
import UsedCars from "./Pages/UsedCars/UsedCars";
import CompareCars from "./Pages/CompareCars/CompareCars";
import CarNews from "./Pages/CarNews/CarNews";
import CarVideos from "./Pages/CarVideos/CarVideos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LatestCars />} />
      <Route path="/latestcars" element={<LatestCars />} />
      <Route path="/:brandSlug-cars" element={<BrandPage />} />
      <Route path="/sell-my-car" element={<SellMyCar/>}/>
      <Route path="/new-cars" element={<NewCars />} />
      <Route path="/used-cars" element={<UsedCars />} />
      <Route path="/compare-cars" element={<CompareCars />} />
      <Route path="/car-news" element={<CarNews />} />
      <Route path="/car-videos" element={<CarVideos />} />
    </Routes>
  );
}

export default App;