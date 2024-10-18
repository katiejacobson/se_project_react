import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

const EditProfileModal = ({
  activeModal,
  closeActiveModal,
  handleEditProfile,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: currentUser.username,
    avatar: currentUser.avatarUrl,
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

    const updatedData = {
      name: data.name || currentUser.username,
      avatar: data.avatar || currentUser.avatarUrl,
    };
    console.log(updatedData);
    handleEditProfile(updatedData);
  };

  useEffect(() => {
    setData({
      name: currentUser.username || "",
      avatar: currentUser.avatarUrl || "",
    });
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Change profile data"
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      name={"edit-profile"}
      isOpen={activeModal === "edit-profile"}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-field">
        <label htmlFor="name" className="modal__label">
          Name*
          <input
            className="modal__input"
            name="name"
            type="text"
            id="name"
            value={data.name}
            minLength="2"
            maxLength="40"
            placeholder="name"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label htmlFor="avatar" className="modal__label">
          Avatar Url*
          <input
            className="modal__input"
            type="url"
            name="avatar"
            id="avatar"
            value={data.avatar}
            placeholder="imageUrl"
            onChange={handleChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
