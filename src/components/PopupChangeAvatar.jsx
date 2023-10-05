import '../index.css';
import PopupWithForm from "./PopupWithForm";

function PopupChangeAvatar({ isOpen, onClose }) {
    return (<PopupWithForm
        name='avatar'
        title='Обновить аватар'
        buttonText='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
    >
        <label className="popup__label" htmlFor="avatar">
            <input className="popup__input" name="avatar" type="url" id="avatar" placeholder="Ссылка на аватар"
                required />
            <span className="avatar-error popup__input-error" />
        </label>
    </PopupWithForm>);
}

export default PopupChangeAvatar;