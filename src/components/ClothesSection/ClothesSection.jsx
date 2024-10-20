import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const ownClothingItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__button-container">
        <p className="clothes-section__text">Your Items</p>
        <button
          className="clothes-section__add-items-button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <div className="clothes-section__item-container">
        <ul className="clothes-section__cards">
          {ownClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
