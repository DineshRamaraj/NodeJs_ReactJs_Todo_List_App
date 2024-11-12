import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../Loading";

const Register = () => {
  const [inputHandle, setInputHandle] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState("");

  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    if (jwtToken !== undefined) {
      navigate("/");
    }
  }, [jwtToken, navigate]);

  const submitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const apiUrl = "https://dintodoapi.onrender.com/api/user/register";

    const userDetails = {
      name: inputHandle.name,
      email: inputHandle.email,
      mobileNumber: inputHandle.mobileNumber,
      password: inputHandle.password,
      confirmPassword: inputHandle.confirmPassword,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      setShowErrorMsg("");
      // console.log("success");
      toast.success(data.message);
      navigate("/login");
    } else {
      // console.log("failure");
      setShowErrorMsg(data.message);
      toast.error(data.message);
    }
    setIsLoading(false);
  };

  //   console.log(inputHandle);

  return (
    <div className="min-h-[calc(100vh-50px)] flex justify-center items-center px-5 md:px-20 py-5">
      <div className="border border-slate-400 bg-blue-50 rounded-md w-[100%] sm:w-[80%] md:max-w-[500px] px-8 py-6 md:px-8 shadow-md">
        <h1 className="text-blue-600 text-[Roboto] font-medium text-lg text-center mb-8">
          Register
        </h1>
        <form onSubmit={submitForm} className="space-y-4 mb-3">
          <div className="flex flex-col w-full space-y-1">
            <label htmlFor="name" className="text-[roboto] text-sm opacity-60">
              Name
            </label>
            <input
              id="name"
              type="type"
              className="bg-slate-100 py-1 px-3 border border-slate-500 outline-none focus:shadow-sm focus:shadow-blue-300 rounded-[3px] opacity-70 placeholder:text-slate-600"
              value={inputHandle.name}
              onChange={(e) =>
                setInputHandle({ ...inputHandle, name: e.target.value })
              }
              placeholder="John Chena"
            />
          </div>
          <div className="flex flex-col w-full space-y-1">
            <label htmlFor="email" className="text-[roboto] text-sm opacity-60">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="bg-slate-100 py-1 px-3 border border-slate-500 outline-none focus:shadow-sm focus:shadow-blue-300 rounded-[3px] opacity-70 placeholder:text-slate-600"
              value={inputHandle.email}
              onChange={(e) =>
                setInputHandle({ ...inputHandle, email: e.target.value })
              }
              placeholder="abcd@gmail.com"
            />
          </div>
          <div className="flex flex-col w-full space-y-1">
            <label
              htmlFor="mobile"
              className="text-[roboto] text-sm opacity-60"
            >
              Mobile Number
            </label>
            <input
              id="mobile"
              type="text"
              className="bg-slate-100 py-1 px-3 border border-slate-500 outline-none focus:shadow-sm focus:shadow-blue-300 rounded-[3px] opacity-70 placeholder:text-slate-600"
              value={inputHandle.mobileNumber}
              onChange={(e) =>
                setInputHandle({ ...inputHandle, mobileNumber: e.target.value })
              }
              placeholder="9876543210"
            />
          </div>
          <div className="flex flex-col w-full space-y-1">
            <label
              htmlFor="password"
              className="text-[roboto] text-sm opacity-60"
            >
              Password
            </label>
            <div className=" px-3 py-1 bg-slate-100 border border-slate-500 focus:shadow-sm focus:shadow-blue-300 flex justify-between items-center rounded-[3px] opacity-70">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="outline-none w-[100%] opacity-70 placeholder:text-slate-900 "
                value={inputHandle.password}
                onChange={(e) =>
                  setInputHandle({ ...inputHandle, password: e.target.value })
                }
                placeholder="**********"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="opacity-80 cursor-pointer"
              >
                {showPassword ? (
                  <IoMdEye size={20} />
                ) : (
                  <IoMdEyeOff size={20} />
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-1">
            <label
              htmlFor="confirmPassword"
              className="text-[roboto] text-sm opacity-60"
            >
              Password
            </label>
            <div className=" px-3 py-1 bg-slate-100 border border-slate-500 focus:shadow-sm focus:shadow-blue-300 flex justify-between items-center rounded-[3px] opacity-70">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="outline-none w-[100%] opacity-70 placeholder:text-slate-900 "
                value={inputHandle.confirmPassword}
                onChange={(e) =>
                  setInputHandle({
                    ...inputHandle,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="**********"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="opacity-80 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <IoMdEye size={20} />
                ) : (
                  <IoMdEyeOff size={20} />
                )}
              </span>
            </div>
          </div>
          {showErrorMsg !== "" && (
            <span className="text-red-600 text-sm text-[roboto]">
              *{showErrorMsg}
            </span>
          )}
          <div className="flex justify-center pt-2">
            <button
              disabled={isLoading}
              type="submit"
              className={`px-5 py-2 bg-blue-600 font-sans text-white rounded-lg ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              } flex items-center`}
            >
              {isLoading && (
                <span className="pr-3">
                  <CustomSpinner
                    size={16}
                    borderColor="#ffffff"
                    borderWidth={3}
                  />
                </span>
              )}
              <span className="text-[roboto] font-medium">Register</span>
            </button>
          </div>
        </form>
        <span
          className="text-sm text-slate-700 text-[roboto] opacity-90 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already Have a Account ?
        </span>
      </div>
    </div>
  );
};

export default Register;
