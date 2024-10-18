import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({
  weatherData,
  handleCardClick,
  handleAddClick,
  clothingItems,
  currentUser,
  closeActiveModal,
  handleEditProfileClick,
  handleLogOut,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          currentUser={currentUser}
          handleEditProfileClick={handleEditProfileClick}
          closeActiveModal={closeActiveModal}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
