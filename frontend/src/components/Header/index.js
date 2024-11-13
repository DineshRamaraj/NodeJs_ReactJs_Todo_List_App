import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  const logoutButton = () => {
    Cookies.remove("jwt_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  const jwtToken = Cookies.get("jwt_token");
  const userName = localStorage.getItem("user_name");

  return (
    <nav className="bg-slate-100 border border-b-slate-300 px-5 md:px-20 py-5 shadow-md flex justify-between items-center">
      <div className="text-slate-700 cursor-pointer">
        <Link to="/">
          <h1 className="text-md">Todo App</h1>
        </Link>
      </div>
      <div>
        {jwtToken !== undefined && (
          <div className="flex items-center gap-8 md:gap-10">
            <div
              className="rounded-full border border-slate-400 py-1 px-3 text-md font-normal flex items-center gap-2"
              title={userName}
            >
              <FaUserCircle size={20} />
              <span className="hidden sm:flex">{userName}</span>
            </div>
            <div className="cursor-pointer" onClick={logoutButton}>
              <MdLogout size={20} title="logout" />
            </div>
          </div>
        )}
        {jwtToken === undefined && (
          <FaRegUserCircle size={20} title="Go to Login" />
        )}
      </div>
    </nav>
  );
};

export default Header;
