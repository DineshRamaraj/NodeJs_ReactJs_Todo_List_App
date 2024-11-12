import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import Cookies from 'js-cookie';

const Header = () => {

    const navigate = useNavigate();

    const logoutButton = () => {
        Cookies.remove('jwt_token');
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        navigate('/login');
    }

  return (
    <div className="bg-slate-100 border border-b-slate-300 px-5 md:px-20 py-5 shadow-md flex justify-between items-center">
      <div className="text-slate-700 cursor-pointer">
        <Link to='/'>
          <h1 className="text-sm font-[roboto]">Demo Project</h1>
        </Link>
      </div>
      <div className="cursor-pointer" onClick={logoutButton}>
        <IoMdLogOut size={20} />
      </div>
    </div>
  );
};

export default Header;
