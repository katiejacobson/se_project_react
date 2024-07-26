import "./ConfirmationModal.css";
import React, { useState, useEffect } from "react";

const ConfirmationModal = ({
  name,
  handleDeleteItem,
  handleCloseClick,
  cardId,
  activeModal,
}) => {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === "delete-item" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container">
        <button
          className="modal__close-button"
          type="button"
          onClick={handleCloseClick}
          aria-label="close"
        />
        <div className="confirmation-modal__container">
          <p className="confirmation-modal__text">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
          <button
            className="confirmation-modal__delete-button"
            type="button"
            aria-label="button"
            onClick={() => handleDeleteItem(cardId)}
          >
            Yes, delete item
          </button>
          <button
            className="confirmation-modal__cancel-button"
            type="button"
            aria-label="button"
            onClick={handleCloseClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
