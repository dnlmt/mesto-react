import React, {useEffect} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from "./Footer";
import PopupChangeAvatar from "./PopupChangeAvatar";
import PopupAddCard from "./PopupAddCard";
import PopupEditProfile from "./PopupEditProfile";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [selectedCard, setSelectedCard] = React.useState({})
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

    useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then(([info, cards]) => {
                setUserInfo(info);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });

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
        setIsImagePopupOpen(false)
    }

    const handleCloseAllPopups = (evt) => {
        if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__close'))) {
            closeAllPopups();
        }
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true)
        return selectedCard
    }

    return (
        <div className="App">
            <div className="page">
                <Header/>
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    userName={userInfo.name}
                    userAvatar={userInfo.avatar}
                    userDescription={userInfo.about}
                    cards={cards}
                    onCardClick={handleCardClick}
                />
                <Footer/>
                <PopupChangeAvatar
                    isOpen={isEditAvatarPopupOpen}
                    onClose={handleCloseAllPopups}
                />
                <PopupAddCard
                    isOpen={isAddPlacePopupOpen}
                    onClose={handleCloseAllPopups}
                />
                <PopupEditProfile
                    isOpen={isEditProfilePopupOpen}
                    onClose={handleCloseAllPopups}
                />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={handleCloseAllPopups}
                />
            </div>
        </div>
    );
}

export default App;
