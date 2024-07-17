import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
  name,
  isOpen,
}) {
  return (
    <>
      <div
        className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      >
        <div className="modal__container">
          <button
            className="modal__close-button"
            type="button"
            onClick={handleCloseClick}
            aria-label="close"
          />
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
