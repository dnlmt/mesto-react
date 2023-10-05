import '../index.css';

function ImagePopup({ card: { name, link }, isOpen, onClose }) {

    return (
        <section className={`popup image ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__image-container">
                <button type="button" aria-label="Закрыть"
                    className="button popup__close-button image__close-button popup__close" />
                <img className="popup__image" src={link} alt={name} />
                <p className="popup__image-name">{name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;