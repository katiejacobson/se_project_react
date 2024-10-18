import "./ItemModal.css";
import { useContext } from "react";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemModal({
  activeModal,
  card,
  name,
  handleDeleteItem,
  openConfirmationModal,
  closeActiveModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const modalDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button" : "modal__delete-button_hidden"
  }`;

  return (
    <>
      <div
        className={`modal modal_type_${name} ${
          activeModal === "preview" ? "modal_opened" : ""
        }`}
      >
        <div className="modal__container">
          <button
            className="modal__close-button"
            type="button"
            aria-label="close"
          ></button>
          <img className="modal__image" src={card.imageUrl} alt={card.name} />
          <div className="modal__caption">
            <div className="modal__info">
              <h2 className="modal__title">{card.name}</h2>
              <p className="modal__text">Weather: {card.weather}</p>
            </div>
            <div className="modal__button-container">
              <button
                className={modalDeleteButtonClassName}
                type="button"
                aria-label="delete"
                onClick={openConfirmationModal}
                value={card._id}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        name={"delete-confirmation"}
        handleDeleteItem={handleDeleteItem}
        handleCloseClick={closeActiveModal}
        cardId={card._id}
        activeModal={activeModal}
      />
    </>
  );
}

export default ItemModal;
