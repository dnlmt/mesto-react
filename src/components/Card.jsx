import '../index.css';

function Card({name, link, likes, onCardClick}) {

    const handleClick = () => {
        onCardClick({name, link});
    }

    return (
        <div id="element-template">
            <article className="element" onClick={handleClick}>
                <img src={link} alt={name} className="element__photo"/>
                <button className="button element__delete" aria-label="Удалить"/>
                <div className="element__title">
                    <h2 className="element__place">{name}</h2>
                    <div className="element__like-container">
                        <button type="button" className="button element__like-button" aria-label="Нравится"/>
                        <p className="element__like-counter">{likes}</p>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default Card;