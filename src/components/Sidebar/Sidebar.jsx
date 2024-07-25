import "./Sidebar.css";
import avatar from "../../assets/avatar.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="default avatar" className="sidebar__image" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default Sidebar;
