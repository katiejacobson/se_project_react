import "./ItemModal.css";

function ItemModal({ activeModal, card, name, handleDeleteItem }) {
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
                className="modal__delete-button"
                type="button"
                aria-label="delete"
                onClick={handleDeleteItem}
                value={card._id}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
