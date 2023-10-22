import "../index.css";
import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupChangeAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null);

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="avatar">
        <input
          className="popup__input"
          name="avatar"
          type="url"
          id="avatar"
          placeholder="Ссылка на аватар"
          ref={avatarRef}
          required
        />
        <span className="avatar-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
}

export default PopupChangeAvatar;
