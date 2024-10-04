// CarFilters.js
import React from "react";

const CarFilters = ({
  locationOptions,
  selectedLocations,
  handleCheckboxChange,
  setSelectedLocations,
  categoryOptions,
  selectedCategories,
  setSelectedCategories,
  selectedFuelTypes,
  setSelectedFuelTypes,
  selectedTransmissionTypes,
  setSelectedTransmissionTypes,
  handleApplyFilters,
}) => {
  return (
    <div className="col-md-4 col-lg-3 pb-3">
      {/* Location Filter */}
      <div className="border rounded-2 p-3 w-100">
        <h6 className="fw-bolder">Choose Location</h6>
        <div className="checkbox-group">
          {locationOptions.map((location, index) => (
            <label key={index} className="d-block">
              <input
                type="checkbox"
                value={location}
                checked={selectedLocations.includes(location)}
                onChange={() => {
                  handleCheckboxChange(setSelectedLocations, location);
                  handleApplyFilters();
                }}
              />
              {location}
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="border rounded-2 p-3 w-100 mt-3">
        <h6 className="fw-bolder">Choose Category</h6>
        <div className="checkbox-group">
          {categoryOptions.map((category, index) => (
            <label key={index} className="d-block">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => {
                  handleCheckboxChange(setSelectedCategories, category);
                  handleApplyFilters();
                }}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="border rounded-2 p-3 w-100 mt-3">
        <h6 className="fw-bolder">Fuel Type</h6>
        <div className="checkbox-group">
          {["Petrol", "Diesel", "Electric"].map((fuelType, index) => (
            <label key={index} className="d-block">
              <input
                type="checkbox"
                value={fuelType}
                checked={selectedFuelTypes.includes(fuelType)}
                onChange={() => {
                  handleCheckboxChange(setSelectedFuelTypes, fuelType);
                  handleApplyFilters();
                }}
              />
              {fuelType}
            </label>
          ))}
        </div>
      </div>

      {/* Transmission Type Filter */}
      <div className="border rounded-2 p-3 w-100 mt-3">
        <h6 className="fw-bolder">Transmission Type</h6>
        <div className="checkbox-group">
          {["Manual", "Automatic"].map((transmissionType, index) => (
            <label key={index} className="d-block">
              <input
                type="checkbox"
                value={transmissionType}
                checked={selectedTransmissionTypes.includes(transmissionType)}
                onChange={() => {
                  handleCheckboxChange(
                    setSelectedTransmissionTypes,
                    transmissionType
                  );
                  handleApplyFilters();
                }}
              />
              {transmissionType}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
