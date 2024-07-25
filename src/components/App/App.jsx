import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getWeather, processWeatherData } from "../../utils/weatherApi.js";
import { getItems } from "../../utils/api.js";
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
  const [clothingItems, setClothingItems] = useState({});

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

  const handleAddItemSubmit = (e, values) => {
    console.log(e);
    console.log(values);
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
    getItems().then((res) => {
      setClothingItems(res);
    });
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
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
            onAddItem={handleAddItemSubmit}
            closeActiveModal={closeActiveModal}
          />
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
