import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ handleEditProfileClick, handleLogOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {!currentUser.avatar ? (
          <p className="sidebar__default-avatar">
            {currentUser.name ? currentUser.name[0].toUpperCase() : ""}
          </p>
        ) : (
          <img
            src={currentUser.avatar}
            alt="avatar image"
            className="sidebar__image"
          />
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__button-container">
        <button
          className="sidebar__button"
          type="button"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
