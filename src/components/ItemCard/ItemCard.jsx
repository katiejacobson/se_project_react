import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    console.log(item);
    onCardClick(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    console.log("Click");
    console.log(item);
    onCardLike(item._id, isLiked);
  };

  const likeButtonClassName = `card__like-button ${
    isLoggedIn ? "card__like-button" : "card__like-button_hidden"
  } ${isLiked ? "card__like-button_active" : "card__like-button"}`;

  return (
    <li className="card">
      <div className="card__heading">
        <p className="card__title">{item.name}</p>
        <button
          className={likeButtonClassName}
          id="card__like-button"
          type="button"
          aria-label="Like"
          onClick={handleLike}
        ></button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      ></img>
    </li>
  );
}

export default ItemCard;
