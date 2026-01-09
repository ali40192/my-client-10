import React, { useContext } from "react";
import AuthContext from "../../Contexts/AuthContext";

const DropDown = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className=" avatar">
          <div className="w-10 rounded-full">
            <img
              alt="profile"
              src={
                user
                  ? user.photoURL
                  : "https://i.ibb.co.com/Zpkv7pMs/download-1.png"
              }
            />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm"
        >
          <li>{user ? user.displayName : "User Not Login Yet"}</li>
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
