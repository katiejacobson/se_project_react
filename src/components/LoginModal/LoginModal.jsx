import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./LoginModal.css";

const LoginModal = ({
  activeModal,
  closeActiveModal,
  handleLogIn,
  handleSignUpClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const isFormValid = data.email && data.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogIn(data);
  };

  useEffect(() => {
    if (!activeModal) return;

    setData({
      email: "",
      password: "",
    });
  }, [activeModal]);

  return (
    <ModalWithForm
      title="Log In"
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      name={"login"}
      isOpen={activeModal === "login"}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-field">
        <label className="modal__label">
          Email*
          <input
            className="modal__input"
            name="email"
            type="email"
            id="login-email"
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
            id="login-password"
            placeholder="Password"
            minLength="2"
            maxLength="40"
            value={data.password}
            onChange={handleChange}
            required
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
          Log In
        </button>
        <button
          className="modal__button-alternative"
          type="button"
          aria-label="button"
          onClick={handleSignUpClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
