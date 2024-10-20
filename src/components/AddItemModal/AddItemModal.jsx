import "./AddItemModal.css";
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const AddItemModal = ({ activeModal, closeActiveModal, onAddItem }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("cold");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const isFormValid = name && imageUrl;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(e, { name, imageUrl, weather });
  };

  useEffect(() => {
    if (!activeModal) return;

    setName("");
    setImageUrl("");
    setWeather("cold");
  }, [activeModal]);

  return (
    <ModalWithForm
      title="New garment"
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      name={"new-garment"}
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-field">
        <label htmlFor="name" className="modal__label">
          Name
          <input
            className="modal__input"
            name="name"
            type="text"
            id="name"
            placeholder="Name"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label htmlFor="url" className="modal__label">
          Image
          <input
            className="modal__input"
            type="url"
            name="image"
            id="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleImageChange}
            required
          />
        </label>
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
            onChange={handleWeatherChange}
            required
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
            onChange={handleWeatherChange}
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
            onChange={handleWeatherChange}
            checked
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </div>
      <button
        className="modal__button-main"
        type="submit"
        aria-label="submit"
        disabled={!isFormValid}
      >
        Add garment
      </button>
    </ModalWithForm>
  );
};

export default AddItemModal;
