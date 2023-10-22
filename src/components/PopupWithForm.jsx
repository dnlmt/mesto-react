import "../index.css";

function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section
      className={`popup edit-${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
      onSubmit={onSubmit}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className={`button popup__close-button popup__close`}
        />
        <form
          className={`popup__form edit-${name}__form`}
          name={`${name}-form`}
        >
          <h2 className={`popup__title`}>{title}</h2>
          {children}
          <button
            type="submit"
            name="saveButton"
            className="popup__button"
            aria-label={`${buttonText}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
