import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard({ isOpen, onClose, onAddPlace, isLoading }) {
  const name = useRef(null);
  const link = useRef(null);

  useEffect(() => {
    name.current.value = "";
    link.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name.current.value,
      link: link.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__label" htmlFor="name">
        <input
          className="popup__input"
          name="name"
          type="text"
          id="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          ref={name}
          required
        />
        <span className="name-error popup__input-error" />
      </label>
      <label className="popup__label" htmlFor="link">
        <input
          className=" popup__input"
          name="link"
          type="url"
          id="link"
          placeholder="Ссылка на картинку"
          ref={link}
          required
        />
        <span className="link-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
}

export default PopupAddCard;
