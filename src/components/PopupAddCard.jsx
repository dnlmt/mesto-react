import '../index.css';
import PopupWithForm from "./PopupWithForm";

function PopupAddCard({isOpen, onClose}) {
    return (<PopupWithForm
        name='add-card'
        title='Новое место'
        buttonText='Создать'
        isOpen={isOpen}
        onClose={onClose}
    >
        <label className="popup__label" htmlFor="name">
            <input className="popup__input" name="name" type="text" id="name" placeholder="Название"
                   minLength="2" maxLength="30" required/>
            <span className="name-error popup__input-error"/>
        </label>
        <label className="popup__label" htmlFor="link">
            <input className=" popup__input" name="link" type="url" id="link" placeholder="Ссылка на картинку"
                   required/>
            <span className="link-error popup__input-error"/>
        </label>
    </PopupWithForm>);
}

export default PopupAddCard;