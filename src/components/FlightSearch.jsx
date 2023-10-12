import React, { useState } from "react";
import flights from "../data/flights";

function FlightSearch() {
  const [tab, setTab] = useState("one-way");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchResults, setSearchResults] = useState([]);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [returnDate, setReturnDate] = useState(""); 
  const [departureDate, setDepartureDate] = useState("");

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  // to handle price changed by the slider 
  const handlePriceRangeChange = (event, sliderIndex) => {
    const newPriceRange = [...priceRange];
    newPriceRange[sliderIndex] = +event.target.value;

    if (sliderIndex === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[1] = newPriceRange[0];
    } else if (sliderIndex === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[0] = newPriceRange[1];
    }

    setPriceRange(newPriceRange);
  };

  // to handle search results
  const handleSearch = () => {
    const filteredFlights = flights.filter((flight) => {
      return (
        flight.departureCity.toLowerCase() === departureCity.toLowerCase() &&
        flight.arrivalCity.toLowerCase() === arrivalCity.toLowerCase() &&
        flight.price >= priceRange[0] &&
        flight.price <= priceRange[1]
      );
    });
    setSearchResults(filteredFlights);
  };

  return (
    <div className="container mt-5">
      <div className=" justify-content-center align-items-center main">
        <div className="">
          <h2 className="text-center mb-4">Flight Search</h2>

          <div className="mb-3 mx-auto">
            <button
              className={`btn mx-3 ${
                tab === "one-way" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handleTabChange("one-way")}
            >
              One Way
            </button>
            <button
              className={`btn mx-3 ${
                tab === "return" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handleTabChange("return")}
            >
              Return
            </button>
          </div>

          {tab === "return" && (
            <input
              type="date"
              className="form-control mb-3"
              placeholder="Return Date"
              onChange={(e) => setReturnDate(e.target.value)}
            />
          )}

          <input
            type="date"
            className="form-control mb-3"
            placeholder="Departure Date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Departure City"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Arrival City"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
          />

          <div className="mb-3">
            <label>Price Range:</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="10000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange(e, 0)}
            />
            <span>Min Price: Rs.{priceRange[0]}</span>
          </div>

          <div className="mb-3">
            <input
              type="range"
              className="form-range"
              min="0"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(e, 1)}
            />
            <span>Max Price: Rs.{priceRange[1]}</span>
          </div>

          <button className="btn btn-success" onClick={handleSearch}>
            Search
          </button>

          <div className="mt-3">
            {searchResults.length > 0 ? (
              searchResults.map((flight) => (
                <div key={flight.id} className="alert alert-info">
                  {flight.departureCity} - {flight.arrivalCity} | Price: Rs.
                  {flight.price}
                </div>
              ))
            ) : (
              <div className="alert alert-warning">
                There are no flights on this route for the selected date
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightSearch;
