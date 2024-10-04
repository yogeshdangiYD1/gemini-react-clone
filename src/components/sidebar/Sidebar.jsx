import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
function Sidebar() {
  const [extended, setExtended] = useState(false);
  const handleClick = () => {
    setExtended(!extended);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={handleClick}
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>new Chat</p> : null}
        </div>{" "}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>What is React...</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-icon recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>help</p> : null}
        </div>
        <div className="bottom-icon recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>activity</p> : null}
        </div>
        <div className="bottom-icon recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>setting</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
