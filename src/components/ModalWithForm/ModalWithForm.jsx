import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
  name,
  handleOnClose,
}) {
  return (
    <>
      {handleOnClose()}
      <div
        className={`modal modal_type_${name} ${
          activeModal === "add-garment" ? "modal_opened" : ""
        }`}
      >
        <div className="modal__container">
          <button
            className="modal__close-button"
            type="button"
            onClick={handleCloseClick}
            aria-label="close"
          ></button>
          <h2 className="modal__heading">{title}</h2>
          <form className="modal__form" name={name} noValidate>
            {children}
            <button className="modal__button" type="submit" aria-label="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
