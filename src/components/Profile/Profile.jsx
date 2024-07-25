import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({ weatherData, handleCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          weatherData={weatherData}
          handleCardClick={handleCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
