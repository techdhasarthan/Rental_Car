import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/fulfillment.css"; // Import your CSS file for styling
import "../../pages/ShowCarDetails.css";
import UploadCheckButton from "../../pages/UploadCheckButton";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { Container, Col } from "reactstrap";
import { encrypt } from "../utils/cryptoUtils";

const Fulfillment = ({ setDeliveryState, handleAddress, handleExtraInfo }) => {
  const [selectedOption, setSelectedOption] = useState("delivery"); // Default active option
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const location = useLocation();
  const { slug } = useParams(); // Extract car name (slug) from the URL
  const [mapInitialized, setMapInitialized] = useState(false); // Track if the map is initialized

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Animation should happen only once
      mirror: false, // Elements should animate out while scrolling past them
    });
  }, []);

  // Initialize the map when "Delivery" option is selected
  useEffect(() => {
    if (selectedOption === "delivery" && !mapInitialized) {
      initMap();
      setMapInitialized(true); // Mark the map as initialized
    }
  }, [selectedOption, mapInitialized]);

  const handleSelectChange = (event) => {
    const addresses = event.target.value;

    handleAddress(addresses);
    setPickupLocation(addresses);

    setDeliveryInfo(""); // Clear delivery info when a pickup location is selected
    setExtraInfo("");
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Clear corresponding fields based on the selected option
    if (selectedValue === "selfPickup") {
      setDeliveryInfo("");
      setExtraInfo("");
      setDeliveryState(1);
      setPickupLocation(""); // Clear pickup location if switching to self-pickup
    } else if (selectedValue === "delivery") {
      setPickupLocation("");
      setDeliveryState(0);
    }
  };

  // Update deliveryInfo when the user types manually
  const handleDeliveryInfoChange = (event) => {
    const addresses = event.target.value; // Get the input value
    setDeliveryInfo(addresses); // Update the deliveryInfo state
    handleAddress(addresses); // Pass the updated address to the parent component

    setPickupLocation(""); // Clear pickup location when delivery info is entered
  };

  const handleExtraInfoChange = (event) => {
    const extraInfo = event.target.value;
    handleExtraInfo(extraInfo);
    setExtraInfo(extraInfo);
    setPickupLocation(""); // Clear pickup location when extra info is entered
  };

  const handleFulfillmentRequest = () => {
    // Clear previous fulfillment-related data first
    localStorage.removeItem("pickupLocation");
    localStorage.removeItem("deliveryInfo");
    localStorage.removeItem("extraInfo");

    // Save selected fulfillment option
    const encryptedFulfillment = encrypt(selectedOption);
    localStorage.setItem("fulfillment", encryptedFulfillment);

    // Save relevant details based on the selected option
    if (selectedOption === "selfPickup") {
      if (pickupLocation) {
        const encryptedPickupLocation = encrypt(pickupLocation);
        localStorage.setItem("deliveryInfo", encryptedPickupLocation);
      }
    } else if (selectedOption === "delivery") {
      if (deliveryInfo) {
        const encryptedDeliveryInfo = encrypt(deliveryInfo);
        localStorage.setItem("deliveryInfo", encryptedDeliveryInfo);
      }
      if (extraInfo) {
        const encryptedExtraInfo = encrypt(extraInfo);
        localStorage.setItem("extraInfo", encryptedExtraInfo);
      }
    }
  };

  // Use useEffect to automatically trigger fulfillment request when relevant fields change
  useEffect(() => {
    handleFulfillmentRequest();
  }, [selectedOption, pickupLocation, deliveryInfo, extraInfo]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  const initMap = async () => {
    await loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDbf4ctII0wFHbVwnFy19k_2BsHWhPjFN8&libraries=places`
    );

    const input = document.getElementById("search-box"); // Your input for searching places
    const searchBoxInstance = new window.google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards the current map's viewport
    searchBoxInstance.addListener("places_changed", () => {
      const places = searchBoxInstance.getPlaces();

      if (places && places.length > 0) {
        const selectedPlace = places[0];
        const formattedAddress = selectedPlace.formatted_address; // Get the formatted address of the selected place
        const location = selectedPlace.geometry.location;

        // Set the delivery info to the formatted address
        setDeliveryInfo(formattedAddress);
        handleAddress(formattedAddress); // Pass to parent

        // Optional: Update any other fields with latitude and longitude
        updateLatLngFields(location);
      }
    });
  };

  const updateLatLngFields = (location) => {
    const lat = location.lat();
    const lng = location.lng();
    console.log("Latitude:", lat, "Longitude:", lng); // You can store these in state or update input fields
  };

  return (
    <Container>
      <Col>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="pb-2">
            <div className="fulfillment-container">
              <div className="radio-buttons">
                <label style={{ cursor: "pointer" }}>
                  <input
                    required
                    type="radio"
                    name="fulfillmentOption"
                    value="selfPickup"
                    checked={selectedOption === "selfPickup"}
                    onChange={handleOptionChange}
                  />
                  Self-Pickup
                </label>
                <label style={{ cursor: "pointer" }}>
                  <input
                    required
                    type="radio"
                    name="fulfillmentOption"
                    value="delivery"
                    checked={selectedOption === "delivery"}
                    onChange={handleOptionChange}
                  />
                  Delivery
                </label>
              </div>

              <UploadCheckButton />

              {selectedOption === "selfPickup" && (
                <div className="select-input-container">
                  <select
                    required
                    className="select-input"
                    value={pickupLocation}
                    onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="Kilampakkam">Kilampakkam</option>
                    <option value="Koyambedu">Koyambedu</option>
                    <option value="Tambaram">Tambaram</option>
                  </select>
                </div>
              )}

              {selectedOption === "delivery" && (
                <div className="delivery-info-container">
                  <input
                    id="search-box" // Make sure to set the ID for the input
                    required
                    type="text"
                    className="input-fieldss"
                    placeholder="Enter delivery address"
                    value={deliveryInfo}
                    onChange={handleDeliveryInfoChange}
                    onFocus={initMap} // Call initMap on focus
                  />
                  <textarea
                    required
                    className="text-areas"
                    placeholder="Enter delivery instructions or additional details"
                    value={extraInfo}
                    onChange={handleExtraInfoChange}
                  />
                </div>
              )}

              <p className="disclaimer">
                <strong>Disclaimer:</strong> Delivery Charges may vary for
                outside city limits locations, including Airport pickup. You can
                add specific instructions related to delivery.
              </p>
            </div>
          </div>
        </form>
      </Col>
    </Container>
  );
};

export default Fulfillment;
