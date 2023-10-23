import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupChangeAvatar from "./PopupChangeAvatar";
import PopupAddCard from "./PopupAddCard";
import PopupEditProfile from "./PopupEditProfile";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, cards]) => {
        setCurrentUser(info);
        setCards(cards);
      })
      .catch(console.error);
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  const handleCloseAllPopups = (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeAllPopups();
    }
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch(console.error);
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards((arr) => arr.filter((item) => item._id !== card._id));
    })
    .catch(console.error);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
    return selectedCard;
  };

  const handleUpdateUser = (u) => {
    setIsLoading(true)
    api.setUserInfo(u).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(console.error)
    .finally(() => 
      setIsLoading(false));
  };

  const handleUpdateAvatar = (u) => {
    setIsLoading(true)
    api.setAvatar(u).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(console.error)
    .finally(() => 
      setIsLoading(false));
  };

  const handleAddPlaceSubmit = (u) => {
    setIsLoading(true)
    api.addCard(u).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups();
    })
    .catch(console.error)
    .finally(() => 
      setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <PopupChangeAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={handleCloseAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <PopupAddCard
            isOpen={isAddPlacePopupOpen}
            onClose={handleCloseAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <PopupEditProfile
            isOpen={isEditProfilePopupOpen}
            onClose={handleCloseAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={handleCloseAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
