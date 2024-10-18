import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./LoginModal.css";

const LoginModal = ({ activeModal, closeActiveModal, handleLogIn }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

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
      buttonText="Log In"
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      name={"login"}
      isOpen={activeModal === "login"}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-field">
        <label htmlFor="email" className="modal__label">
          Email*
          <input
            className="modal__input"
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            required
            value={data.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label htmlFor="password" className="modal__label">
          Password*
          <input
            className="modal__input"
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            minLength="2"
            maxLength="40"
            value={data.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
