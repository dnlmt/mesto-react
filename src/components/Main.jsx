import React, { useEffect } from "react";
import '../index.css';
import Card from "./Card";
import api from "../utils/api";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userInfo, setUserInfo] = React.useState({})
    const [cards, setCards] = React.useState([])

    const [userName, setUserName] = React.useState(null)
    const [userDescription, setUserDescription] = React.useState(null)
    const [userAvatar, setUserAvatar] = React.useState(null)

    useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then(([info, cards]) => {
                setUserInfo(info);
                setCards(cards);
            })
            .catch(console.error);

    }, []);

    useEffect(() => {
        setUserName(userInfo.name)
        setUserDescription(userInfo.about)
        setUserAvatar(userInfo.avatar)
    });

    return (<main className="main">
        <section className="profile">
            <div className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}>
                <div className="profile__avatar-icon" />
            </div>
            <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <button type="button" className="button profile__edit-button" aria-label="Закрыть"
                    onClick={onEditProfile}></button>
                <p className="profile__speciality">{userDescription}</p>
            </div>
            <button type="button" className="button profile__add-button" aria-label="Редактировать"
                onClick={onAddPlace}></button>
        </section>

        <section className="elements">
            {cards.map(item => (
                <Card
                    name={item.name}
                    link={item.link}
                    likes={item.likes.length}
                    key={item._id}
                    onCardClick={onCardClick}
                    card={item}
                />
            ))
            }
        </section>
    </main>);
}

export default Main;