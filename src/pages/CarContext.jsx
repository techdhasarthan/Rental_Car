import React, { createContext, useState } from "react";

// Create context
export const CarContext = createContext();

// Context provider component
export const CarProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState([]); // Manage filtered car data
  alert(filteredData.data);

  return (
    <CarContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </CarContext.Provider>
  );
};
