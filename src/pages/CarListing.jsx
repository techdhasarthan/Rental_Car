import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import "../styles/search.css";
import { useState, useEffect } from "react";
import PricingPlan from "../components/UI/Planing";
import DateTimeInput from "../components/UI/DateTimeInput";
import { encrypt, decrypt } from "../components/utils/cryptoUtils";

const CarListing = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, []);

  const Fromdate = decrypt(localStorage.getItem("startdate"));
  const Todate = decrypt(localStorage.getItem("enddate"));

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [fromdate, setFromDate] = useState(Fromdate);
  const [todate, setToDate] = useState(Todate);
  const [sortByPrice, setSortOrder] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const [sortFuel, setSortFuel] = useState("");
  const [sortType, setSortType] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(""); // Selected pricing plan
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // States for dynamic filter options
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [distancePlans, setDistancePlans] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    []
  );
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Change handlers for filter options
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
  const handleSortFuelChange = (e) => setSortFuel(e.target.value);
  const handleSortTypeChange = (e) => setSortType(e.target.value);

  const handleApplyFilters = (selectedKmPlan) => {
    setFilterApplied((prev) => !prev);

    // Format and encrypt the start and end dates
    const formattedStartdate = startdate.replace("T", " ");
    const formattedEnddate = enddate.replace("T", " ");

    const encryptedStartdate = encrypt(formattedStartdate);
    const encryptedEnddate = encrypt(formattedEnddate);

    // Store the encrypted dates in localStorage
    localStorage.setItem("startdate", encryptedStartdate);
    localStorage.setItem("enddate", encryptedEnddate);

    // Call the API with the selected pricing plan
    applyFilters(selectedKmPlan);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (setter, value) => {
    setter((prev) => {
      const updatedSelection = prev.includes(value)
        ? prev.filter((item) => item !== value) // Uncheck: remove value
        : [...prev, value]; // Check: add value
      return updatedSelection;
    });
  };

  // Trigger the filter application after each state update
  useEffect(() => {
    applyFilters(selectedPlan);
  }, [
    selectedCategories,
    selectedFuelTypes,
    selectedTransmissionTypes,
    selectedLocations,
    selectedPlan,
  ]);

  // Fetch filter options
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
          `${BASE_URL}/getPricePlanRuleList`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          }
        );

        if (!distanceResponse.ok)
          throw new Error("Failed to fetch distance options");
        const distanceResult = await distanceResponse.json();

        // Extract Limit Km values from the data array
        const limitKmPlans = distanceResult.data.map(
          (plan) => plan["Limit Km"]
        );

        setDistancePlans(limitKmPlans);
        if (limitKmPlans.length > 0) {
          setSelectedPlan(limitKmPlans[0]);
          handleApplyFilters(limitKmPlans[0]); // Pass the default plan
        }

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

  // Apply filters
  const applyFilters = async (selectedKmPlan) => {
    const filterData = {
      categoryArgs:
        selectedCategories.length > 0 ? selectedCategories.join(",") : "", // Send only non-empty
      fuelType: selectedFuelTypes.length > 0 ? selectedFuelTypes.join(",") : "",
      transmissionType:
        selectedTransmissionTypes.length > 0
          ? selectedTransmissionTypes.join(",")
          : "",
      kmLimit: selectedKmPlan || "", // Selected plan or empty
      location: selectedLocations.length > 0 ? selectedLocations.join(",") : "",
      sortByPrice: sortByPrice,
      fromDate: startdate ? startdate : fromdate,
      toDate: enddate ? enddate : todate,
    };

    try {
      const response = await fetch(`${BASE_URL}/getCustomerRentalCarsList`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterData),
      });

      if (!response.ok) throw new Error("Failed to fetch filtered data");

      const result = await response.json();
      setFilteredData(result.data && result.data.length > 0 ? result.data : []);
    } catch (error) {
      console.error("Error fetching filtered data:", error.message);
      setFilteredData([]); // If there's an error, clear the filtered data
    }

    const formattedStartdate = startdate;
    const formattedEnddate = enddate;

    const encryptedStartdate = encrypt(formattedStartdate);
    const encryptedEnddate = encrypt(formattedEnddate);

    // Store the encrypted dates in localStorage
    localStorage.setItem("startdate", encryptedStartdate);
    localStorage.setItem("enddate", encryptedEnddate);
  };

  useEffect(() => {
    if (distancePlans.length > 0) {
      setSelectedPlan(distancePlans[0]); // Default plan to the first one
    }
  }, [distancePlans]); // Runs when distancePlans are provided

  const handleRadioChange = (plan) => {
    setSelectedPlan(plan);
    handleApplyFilters(plan);
  };

  return (
    <Helmet title="Cars">
      <section className="car">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex justify-content-between align-items-center pricing-plan-container">
                <div className="d-flex align-items-center flex-wrap mb-3 gap-2">
                  <PricingPlan
                    setStartDateProp={setStartDate}
                    setEndDateProp={setEndDate}
                  />
                  <button
                    className="apply-filters-btn"
                    onClick={() => handleApplyFilters(selectedPlan)}>
                    Modify Date
                  </button>
                </div>

                <div className="radio-group d-flex flex-column">
                  <h6 className="fw-bolder">Select Pricing Plan</h6>
                  <div className="plan-options d-flex">
                    {distancePlans.map((plan, index) => (
                      <label
                        key={index}
                        className={`radio-label ${
                          selectedPlan === plan ? "selected" : ""
                        }`}>
                        <input
                          className="plans"
                          type="radio"
                          value={plan}
                          checked={selectedPlan === plan}
                          onChange={() => handleRadioChange(plan)}
                        />
                        {plan + " Km"}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Col>

            <Col lg="12" className="border-black border-1">
              <div className="search-sort-container">
                <div className="container-fluid  d-flex">
                  <div className="row w-100">
                    {/* Filter Options Column */}
                    <div className="col-md-4 col-lg-3 pb-3">
                      <div className="border rounded-2 p-3 w-100">
                        <h6 className="fw-bolder">Choose Branch</h6>
                        <div className="checkbox-group">
                          {locationOptions.map(
                            (location, index) =>
                              location !== "" && ( // Use && to conditionally render JSX
                                <label key={index} className="d-block">
                                  <input
                                    type="checkbox"
                                    value={location}
                                    checked={selectedLocations.includes(
                                      location
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        setSelectedLocations,
                                        location
                                      )
                                    }
                                  />
                                  {location}
                                </label>
                              )
                          )}
                        </div>
                      </div>

                      <div className="border rounded-2 p-3 w-100 mt-3">
                        <h6 className="fw-bolder">Choose Category</h6>
                        <div className="checkbox-group">
                          {categoryOptions.map(
                            (category, index) =>
                              category !== "" && ( // Use && to conditionally render JSX
                                <label key={index} className="d-block">
                                  <input
                                    type="checkbox"
                                    value={category}
                                    checked={selectedCategories.includes(
                                      category
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        setSelectedCategories,
                                        category
                                      )
                                    }
                                  />
                                  {category}
                                </label>
                              )
                          )}
                        </div>
                      </div>

                      <div className="border rounded-2 p-3 w-100 mt-3">
                        <h6 className="fw-bolder">Fuel Type</h6>
                        <div className="checkbox-group">
                          {["Petrol", "Diesel", "Electric"].map(
                            (fuelType, index) => (
                              <label key={index} className="d-block">
                                <input
                                  type="checkbox"
                                  value={fuelType}
                                  checked={selectedFuelTypes.includes(fuelType)}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      setSelectedFuelTypes,
                                      fuelType
                                    )
                                  }
                                />
                                {fuelType}
                              </label>
                            )
                          )}
                        </div>
                      </div>

                      <div className="border rounded-2 p-3 w-100 mt-3">
                        <h6 className="fw-bolder">Transmission Type</h6>
                        <div className="checkbox-group">
                          {["Manual", "Automatic"].map(
                            (transmissionType, index) => (
                              <label key={index} className="d-block">
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
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cars Display Column */}
                    <div className="col-md-8 col-lg-9">
                      <Row>
                        {filteredData.length === 0 ? (
                          <h4 className="text-center">No cars found</h4>
                        ) : (
                          filteredData.map((item) => (
                            <Col lg="6" key={item.id}>
                              <CarItem item={item} />
                            </Col>
                          ))
                        )}
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
