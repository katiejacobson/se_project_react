import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

const RegisterModal = ({
  activeModal,
  closeActiveModal,
  handleRegistration,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    avatarUrl: "",
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
    console.log(data);
    handleRegistration(data);
  };

  useEffect(() => {
    if (!activeModal) return;

    setData({
      username: "",
      email: "",
      password: "",
      avatarUrl: "",
    });
  }, [activeModal]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      name={"register"}
      isOpen={activeModal === "register"}
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

      <div className="modal__form-field">
        <label htmlFor="name" className="modal__label">
          Name*
          <input
            className="modal__input"
            name="username"
            type="text"
            id="username"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            value={data.username}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label htmlFor="avatar_url" className="modal__label">
          Avatar URL*
          <input
            className="modal__input"
            type="url"
            name="avatarUrl"
            id="avatarUrl"
            placeholder="Avatar URL"
            value={data.avatarUrl}
            onChange={handleChange}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
