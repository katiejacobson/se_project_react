import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ weatherData, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__button-container">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__add-items-button">+ Add New</button>
      </div>
      <div className="clothes-section__item-container">
        <ul className="itemcards">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
