import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/fulfillment.css"; // Import your CSS file for styling
import "../../pages/ShowCarDetails.css";
import UploadCheckButton from "../../pages/UploadCheckButton";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { message } from "antd";
import { Container, Col } from "reactstrap";
import { encrypt, decrypt } from "../utils/cryptoUtils";

const Fulfillment = ({
  setDeliveryState,
  handleAddress,
  handleExtraInfo,
  onSubmitAddress,
}) => {
  const [selectedOption, setSelectedOption] = useState("delivery"); // Default active option
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const location = useLocation();
  const { slug } = useParams(); // Extract car name (slug) from the URL
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Animation should happen only once
      mirror: false, // Elements should animate out while scrolling past them
    });
  }, []);

  const handleSelectChange = (event) => {
    const addresses = event.target.value;

    handleAddress(addresses);
    setPickupLocation(event.target.value);

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
    } else if (selectedValue === "delivery") {
      setPickupLocation("");
      initMap(); // Re-initialize the map when 'Delivery' is selected
      setDeliveryState(0);
    }
  };

  // Update deliveryInfo when the user types manually
  const handleDeliveryInfoChange = (event) => {
    const addresses = event.target.value; // Get the value from the input field
    setDeliveryInfo(addresses); // Update the deliveryInfo state
    handleAddress(addresses); // Pass the updated address to the parent component

    setPickupLocation(""); // Clear pickup location when delivery info is entered
  };

  const handleExtraInfoChange = (event) => {
    const extraInfo = event.target.value;
    handleExtraInfo(extraInfo);
    setExtraInfo(event.target.value);
    setPickupLocation(""); // Clear pickup location when extra info is entered
  };

  // Automatically submit the address data whenever it changes
  const autoSubmitAddress = () => {
    const selectedAddress =
      selectedOption === "selfPickup" ? pickupLocation : deliveryInfo;

    if (selectedAddress) {
      // Automatically submit address
      onSubmitAddress(selectedAddress);
      message.success("Address submitted automatically!");
    }
  };

  // Trigger whenever the selected option, pickup location, delivery info, or extra info changes
  useEffect(() => {
    autoSubmitAddress(); // Automatically submit address when fields change
    handleFulfillmentRequest(); // Optionally store in localStorage
  }, [selectedOption, pickupLocation, deliveryInfo, extraInfo]);

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

    const mapInstance = new window.google.maps.Map(
      document.createElement("div") // Placeholder div for the map
    );

    const input = document.getElementById("search-box"); // Your input for searching places
    const searchBoxInstance = new window.google.maps.places.SearchBox(input);

    setMap(mapInstance); // Store map instance in state
    setSearchBox(searchBoxInstance); // Store SearchBox instance in state

    // Bias the SearchBox results towards the current map's viewport
    mapInstance.addListener("bounds_changed", () => {
      searchBoxInstance.setBounds(mapInstance.getBounds());
    });

    // Listen for the event when the user selects a prediction from the pick list
    searchBoxInstance.addListener("places_changed", () => {
      const places = searchBoxInstance.getPlaces();

      if (places && places.length > 0) {
        const selectedPlace = places[0];
        const formattedAddress = selectedPlace.formatted_address; // Get the formatted address of the selected place
        const location = selectedPlace.geometry.location;

        // Set the delivery info to the formatted address
        setDeliveryInfo(formattedAddress);

        // Optional: Update any other fields with latitude and longitude
        updateLatLngFields(location);
      }
    });
  };

  const updateLatLngFields = (location) => {
    // Update your latitude and longitude fields here
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
