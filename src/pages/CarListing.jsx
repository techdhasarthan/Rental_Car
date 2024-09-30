import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import "../styles/search.css";
import { useState, useEffect } from "react";
import PricingPlan from "../components/UI/Planing";
import DateTimeInput from "../components/UI/DateTimeInput";

const CarListing = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts

    localStorage.removeItem("fromdate");
    localStorage.removeItem("todate");
  }, []);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [sortByPrice, setSortOrder] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const [sortFuel, setSortFuel] = useState("");
  const [sortType, setSortType] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [refresh, setRefresh] = useState("");

  // States for dynamic filter options
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [distancePlans, setDistancePlans] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  // States for selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    []
  );
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Change handlers
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
  const handleSortFuelChange = (e) => setSortFuel(e.target.value);
  const handleSortTypeChange = (e) => setSortType(e.target.value);
  const handlePlanChange = (e) => setSelectedPlan(e.target.value);
  const handleLocationChange = (e) => setSelectedLocation(e.target.value);
  const handleApplyFilters = () => {
    localStorage.setItem("fromdate", startdate);
    localStorage.setItem("todate", enddate);
    setFilterApplied((prev) => !prev);
  };

  const handleCheckboxChange = (setter, value) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Fetching filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const categoryResponse = await fetch(
          `${BASE_URL}/getDefaultPropertyValuesByName`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "Property Name": "Category" }),
          }
        );

        if (!categoryResponse.ok)
          throw new Error("Failed to fetch category options");
        const categoryResult = await categoryResponse.json();
        setCategoryOptions(
          (categoryResult.data["Property Value"] || "").split(",")
        );

        const distanceResponse = await fetch(
          `${BASE_URL}/getDefaultPropertyValuesByName`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "Property Name": "Km Limit" }),
          }
        );

        if (!distanceResponse.ok)
          throw new Error("Failed to fetch distance options");
        const distanceResult = await distanceResponse.json();
        setDistancePlans(
          (distanceResult.data["Property Value"] || "").split(",")
        );

        const locationResponse = await fetch(
          `${BASE_URL}/getDefaultPropertyValuesByName`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "Property Name": "Branch" }),
          }
        );

        if (!locationResponse.ok)
          throw new Error("Failed to fetch location options");
        const locationResult = await locationResponse.json();
        setLocationOptions(
          (locationResult.data["Property Value"] || "").split(",")
        );
      } catch (error) {
        console.error("Error fetching filter options:", error.message);
      }
    };

    fetchFilterOptions();
  }, []);

  // Apply Filters
  useEffect(() => {
    const applyFilters = async () => {
      const filterData = {
        categoryArgs: selectedCategories.join(","),
        fuelType: selectedFuelTypes.join(","),
        transmissionType: selectedTransmissionTypes.join(","),
        kmLimit: selectedPlans.join(","),
        location: selectedLocations.join(","),
        sortByPrice,
        startdate,
        enddate,
      };

      try {
        const response = await fetch(`${BASE_URL}/getCustomerRentalCarsList`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filterData),
        });

        if (!response.ok) throw new Error("Failed to fetch filtered data");

        const result = await response.json();
        setFilteredData(
          result.data && result.data.length > 0 ? result.data : []
        );
      } catch (error) {
        console.error("Error fetching filtered data:", error.message);
        setFilteredData([]);
      }
    };

    applyFilters();
  }, [filterApplied, refresh]);

  // Refresh Filter
  const applyRefresh = () => {
    setRefresh(refresh + 1);
    setSortOrder("");
    setSortCategory("");
    setSortFuel("");
    setSortType("");
    setSelectedPlan("");
    setSelectedLocation("");
    setStartDate("");
    setEndDate("");
    setFilterApplied(false);
    setFilteredData([]);
    setSelectedCategories([]);
    setSelectedFuelTypes([]);
    setSelectedTransmissionTypes([]);
    setSelectedPlans([]);
    setSelectedLocations([]);
  };

  return (
    <Helmet title="Cars">
      <section className="car">
        <Container>
          <Row>
            <Col lg="12">
              <div className="pricing-plan-container">
                <PricingPlan
                  setStartDateProp={setStartDate}
                  setEndDateProp={setEndDate}
                />

                <button
                  className="apply-filters-btn"
                  onClick={handleApplyFilters}>
                  Apply Filters
                </button>
                <button className="apply-refresh-btn" onClick={applyRefresh}>
                  Refresh
                </button>
              </div>
            </Col>
            <Col lg="12" className="border-black border-1">
              <div className="search-sort-container ">
                <div
                  className="sort-label-container border-1 shadow  pe-5 ps-5 pt-2 pb-2 me-5"
                  style={{ borderColor: "gray" }}>
                  {/* Checkboxes for Location */}
                  <div className="checkbox-group ">
                    <h6
                      className="fw-bolder text-start pb-1"
                      style={{ textAlign: "left" }}>
                      Choose Location
                    </h6>

                    {locationOptions.map((location, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          value={location}
                          checked={selectedLocations.includes(location)}
                          onChange={() =>
                            handleCheckboxChange(setSelectedLocations, location)
                          }
                        />
                        {location}
                      </label>
                    ))}
                  </div>

                  {/* Checkboxes for Category */}
                  <div className="checkbox-group  pb-1">
                    <h6 className="fw-bolder">Choose Category</h6>
                    {categoryOptions.map((category, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          value={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() =>
                            handleCheckboxChange(
                              setSelectedCategories,
                              category
                            )
                          }
                        />
                        {category}
                      </label>
                    ))}
                  </div>

                  {/* Checkboxes for Fuel Type */}
                  <div className="checkbox-group  pb-1">
                    <h6 className="fw-bolder">Fuel Type</h6>
                    {["Petrol", "Diesel", "Electric"].map((fuelType, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          value={fuelType}
                          checked={selectedFuelTypes.includes(fuelType)}
                          onChange={() =>
                            handleCheckboxChange(setSelectedFuelTypes, fuelType)
                          }
                        />
                        {fuelType}
                      </label>
                    ))}
                  </div>

                  {/* Checkboxes for Transmission Type */}
                  <div className="checkbox-group  pb-1">
                    <h6 className="fw-bolder">Transmission Type</h6>
                    {["Manual", "Automatic"].map((transmissionType, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          value={transmissionType}
                          checked={selectedTransmissionTypes.includes(
                            transmissionType
                          )}
                          onChange={() =>
                            handleCheckboxChange(
                              setSelectedTransmissionTypes,
                              transmissionType
                            )
                          }
                        />
                        {transmissionType}
                      </label>
                    ))}
                  </div>

                  {/* Checkboxes for Distance Plans */}
                  <div className="checkbox-group  pb-1">
                    <h6 className="fw-bolder">Choose Distance</h6>
                    {distancePlans.map((plan, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          value={plan}
                          checked={selectedPlans.includes(plan)}
                          onChange={() =>
                            handleCheckboxChange(setSelectedPlans, plan)
                          }
                        />
                        {plan}
                      </label>
                    ))}
                  </div>
                </div>

                <Col lg="9">
                  <Row>
                    {filteredData.length === 0 ? (
                      <h4 className="text-center">No cars found</h4>
                    ) : (
                      filteredData.map((item) => (
                        <Col lg="4" md="6" sm="12" key={item.id}>
                          <CarItem item={item} />
                        </Col>
                      ))
                    )}
                  </Row>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
