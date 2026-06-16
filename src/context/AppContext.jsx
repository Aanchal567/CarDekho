import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [city, setCity] = useState("Jaipur");
  const [wishlist, setWishlist] = useState([]); // Array of car objects
  const [user, setUser] = useState(null); // Auth user object
  const [activeFilters, setActiveFilters] = useState({
    brand: "",
    budget: "",
    bodyType: "",
    fuel: "",
    transmission: "",
    seating: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState(null); // Car object for details modal

  const addToWishlist = (car) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.name === car.name)) return prev;
      return [...prev, car];
    });
  };

  const removeFromWishlist = (carName) => {
    setWishlist((prev) => prev.filter((item) => item.name !== carName));
  };

  const toggleWishlist = (car) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.name === car.name);
      if (exists) {
        return prev.filter((item) => item.name !== car.name);
      } else {
        return [...prev, car];
      }
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      brand: "",
      budget: "",
      bodyType: "",
      fuel: "",
      transmission: "",
      seating: "",
    });
  };

  return (
    <AppContext.Provider
      value={{
        city,
        setCity,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        activeFilters,
        setActiveFilters,
        clearFilters,
        searchQuery,
        setSearchQuery,
        selectedCar,
        setSelectedCar,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
