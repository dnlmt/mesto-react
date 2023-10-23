import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function PopupEditProfile({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleName = (evt) => {
    setName(evt.target.value);
  };
  const handleDescription = (evt) => {
    setDescription(evt.target.value);
  };

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
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
          value={name || ""}
          onChange={handleName}
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
          value={description || ""}
          onChange={handleDescription}
          required
        />
        <span className="userSpec-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
}

export default PopupEditProfile;
