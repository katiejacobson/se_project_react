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
    name: currentUser.name,
    avatar: currentUser.avatar,
    _id: currentUser._id,
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
      name: data.name || currentUser.name,
      avatar: data.avatar || currentUser.avatar,
      _id: data._id || currentUser._id,
    };
    handleEditProfile(updatedData);
  };

  useEffect(() => {
    setData({
      name: currentUser.name,
      avatar: currentUser.avatar,
      _id: currentUser._id,
    });
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      name={"edit-profile"}
      isOpen={activeModal === "edit-profile"}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-field">
        <label className="modal__label">
          Name*
          <input
            className="modal__input"
            name="name"
            type="text"
            id="nameEdit"
            value={data.name}
            minLength="2"
            maxLength="40"
            placeholder="name"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label className="modal__label">
          Avatar Url*
          <input
            className="modal__input"
            type="url"
            name="avatar"
            id="avatarEdit"
            value={data.avatar}
            placeholder="imageUrl"
            onChange={handleChange}
          />
        </label>
      </div>
      <button className="modal__button-main" type="submit" aria-label="submit">
        Change profile data
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
