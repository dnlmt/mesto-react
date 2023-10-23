import React, { useEffect } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <div className="profile__avatar-icon" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="button profile__edit-button"
            aria-label="Закрыть"
            onClick={onEditProfile}
          ></button>
          <p className="profile__speciality">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button profile__add-button"
          aria-label="Редактировать"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((item) => (
          <Card
            name={item.name}
            link={item.link}
            likes={item.likes.length}
            key={item._id}
            onCardClick={onCardClick}
            card={item}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
