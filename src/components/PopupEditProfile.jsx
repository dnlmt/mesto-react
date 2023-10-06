import "../index.css";
import PopupWithForm from "./PopupWithForm";

function PopupChangeAvatar({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="popup__label" htmlFor="userName">
        <input
          className="popup__input"
          name="name"
          type="text"
          id="userName"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="userName-error popup__input-error" />
      </label>
      <label className="popup__label" htmlFor="userSpec">
        <input
          className="popup__input"
          name="about"
          type="text"
          id="userSpec"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="userSpec-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
}

export default PopupChangeAvatar;
