import "./Sidebar.css";
import avatar from "../../assets/avatar.svg";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function Sidebar({ currentUser, handleEditProfileClick, handleLogOut }) {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          src={currentUser.avatarUrl}
          alt="avatar image"
          className="sidebar__image"
        />
        <p className="sidebar__username">{currentUser.username}</p>
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
