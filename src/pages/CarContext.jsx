import React, { createContext, useState } from "react";

// Create a Context for car details
export const CarContext = createContext();

// Create a Provider component
export const CarProvider = ({ children }) => {
  const [carDetails, setCarDetails] = useState(null);

  return (
    <CarContext.Provider value={{ carDetails, setCarDetails }}>
      {children}
    </CarContext.Provider>
  );
};
