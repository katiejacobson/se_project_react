import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <div>
      <li className="card">
        <p className="card__title">{item.name}</p>
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.link}
          alt={item.name}
        ></img>
      </li>
    </div>
  );
}

export default ItemCard;
