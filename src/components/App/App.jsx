import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, processWeatherData } from "../../utils/weatherApi.js";
import {
  coordinates,
  hawaiiCoordinates,
  manilaCoordinates,
  APIkey,
} from "../../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    city: "",
    temperature: "",
    day: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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
    getWeather(coordinates, APIkey)
      .then((res) => {
        const currentWeather = processWeatherData(res);
        setWeatherData(currentWeather);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
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
    </div>
  );
}

export default App;
