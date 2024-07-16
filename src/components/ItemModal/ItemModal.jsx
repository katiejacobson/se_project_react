import "./ItemModal.css";

function ItemModal({ activeModal, card, handleOnClose, name }) {
  return (
    <>
      {handleOnClose()}
      <div
        className={`modal modal_type_${name} ${
          activeModal === "preview" ? "modal_opened" : ""
        }`}
      >
        <div className="modal__container">
          <button
            className="modal__close-button"
            type="button"
            onClick={handleOnClose}
            aria-label="close"
          ></button>
          <img className="modal__image" src={card.link} alt={card.name} />
          <div className="modal__caption">
            <h2 className="modal__title">{card.name}</h2>
            <p className="modal__text">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
