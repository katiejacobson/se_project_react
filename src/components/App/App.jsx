import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, processWeatherData } from "../../utils/weatherApi.js";
import {
  coordinates,
  hawaiiCoordinates,
  manilaCoordinates,
  icelandCoordinates,
  APIkey,
} from "../../utils/constants.js";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    city: "",
    temperature: { F: "", C: "" },
    day: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = (e) => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const setTemperatureDisplay = (currentTemperatureUnit) => {
    if (currentTemperatureUnit === "F") {
      return weatherData.temperature.F + " ºF";
    } else {
      return weatherData.temperature.C + " ºC";
    }
  };

  const handleCardClick = (item) => {
    setActiveModal("preview");
    setSelectedCard(item);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleModalClose = (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
      if (evt.target.classList.contains("modal__close-button")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleModalClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleModalClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(manilaCoordinates, APIkey)
      .then((res) => {
        const currentWeather = processWeatherData(res);
        setWeatherData(currentWeather);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  setTemperatureDisplay={setTemperatureDisplay}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
            name={"new-garment"}
            isOpen={activeModal === "add-garment"}
          >
            <div className="modal__form-field">
              <label htmlFor="name" className="modal__label">
                Name{" "}
                <input
                  className="modal__input"
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Name"
                  required
                  minLength="2"
                  maxLength="40"
                />{" "}
              </label>
            </div>
            <div className="modal__form-field">
              <label htmlFor="url" className="modal__label">
                Image
              </label>
              <input
                className="modal__input"
                type="url"
                name="image"
                id="url"
                placeholder="Image URL"
              />
            </div>
            <div className="modal__form-field">
              <p className="modal__text">Select the weather type:</p>
              <div className="modal__radio-button">
                <input
                  className="modal__radio-button-choice"
                  type="radio"
                  name="weather"
                  id="hot"
                  value="hot"
                />
                <label htmlFor="hot">Hot</label>
              </div>
              <div className="modal__radio-button">
                <input
                  className="modal__radio-button-choice"
                  type="radio"
                  name="weather"
                  id="warm"
                  value="warm"
                />
                <label htmlFor="warm">Warm</label>
              </div>
              <div className="modal__radio-button">
                <input
                  className="modal__radio-button-choice"
                  type="radio"
                  name="weather"
                  id="cold"
                  value="cold"
                />
                <label htmlFor="cold">Cold</label>
              </div>
            </div>
          </ModalWithForm>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            name={"preview"}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
