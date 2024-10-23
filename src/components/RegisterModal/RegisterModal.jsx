import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

const RegisterModal = ({
  activeModal,
  closeActiveModal,
  handleRegistration,
  handleLogInClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const isFormValid = data.email && data.password && data.name;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  useEffect(() => {
    if (!activeModal) return;

    setData({
      name: "",
      email: "",
      password: "",
      avatar: "",
    });
  }, [activeModal]);

  return (
    <ModalWithForm
      title="Sign Up"
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      name={"register"}
      isOpen={activeModal === "register"}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-field">
        <label className="modal__label">
          Email*
          <input
            className="modal__input"
            name="email"
            type="email"
            id="register-email"
            placeholder="Email"
            required
            value={data.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label className="modal__label">
          Password*
          <input
            className="modal__input"
            type="text"
            name="password"
            id="register-password"
            placeholder="Password"
            minLength="2"
            maxLength="40"
            value={data.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="modal__form-field">
        <label className="modal__label">
          Name*
          <input
            className="modal__input"
            name="name"
            type="text"
            id="register-name"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            value={data.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label className="modal__label">
          Avatar URL*
          <input
            className="modal__input"
            type="url"
            name="avatar"
            id="register-avatar"
            placeholder="Avatar URL"
            value={data.avatar}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="modal__button-container">
        <button
          className="modal__button-main"
          type="submit"
          aria-label="submit"
          disabled={!isFormValid}
        >
          Sign Up
        </button>
        <button
          className="modal__button-alternative"
          type="button"
          aria-label="button"
          onClick={handleLogInClick}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
