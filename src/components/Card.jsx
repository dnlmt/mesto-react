import "../index.css";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  name,
  link,
  likes,
  onCardClick,
  card,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = isLiked
    ? "button element__like-button element__like-button_enabled"
    : "button element__like-button";

  const handleClick = () => {
    onCardClick({ name, link });
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <article className="element">
      <img
        src={link}
        alt={name}
        className="element__photo"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="button element__delete"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__title">
        <h2 className="element__place">{name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Нравится"
          />
          <p className="element__like-counter">{likes}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
