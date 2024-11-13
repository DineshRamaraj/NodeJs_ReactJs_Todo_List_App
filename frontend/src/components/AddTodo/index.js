import React, { useState } from "react";
import shortUUID from "short-uuid";
import CustomSpinner from "../Loading";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import api from "../AxiosAPI";

const uuid = shortUUID.generate;

const statusList = [
  {
    id: uuid(),
    status: "Pending",
  },
  {
    id: uuid(),
    status: "Progress",
  },
  {
    id: uuid(),
    status: "Completed",
  },
];

const AddTodo = ({ setMainContent, setShowMainPage, showMainPage }) => {
  const [inputHandle, setInputHandle] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const jwtToken = Cookies.get("jwt_token");
  const userId = localStorage.getItem("user_id");

  const submitAddForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // const apiUrl = `https://dintodoapi.onrender.com/api/${userId}/todo`;

    // const apiUrl = `http://localhost:5000/api/${userId}/todo`;

    const userDetails = {
      title: inputHandle.title,
      description: inputHandle.description || "This is My Description",
      status: inputHandle.status,
    };

    try {
      const response = await api.post(`/${userId}/todo`, userDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setShowErrorMsg("");
        setInputHandle({ title: "", description: "", status: "" });
        toast.success(response.data.message);
      } else {
        setShowErrorMsg(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      setShowErrorMsg("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setMainContent("");
      setShowMainPage(false);
    }
  };

  return (
    <>
      <div
        className={`${
          showMainPage ? "absolute z-30" : "auto"
        } absolute min-h-[calc(100vh-50px)] flex flex-col justify-center items-center px-5 md:px-20 py-5 w-[100%] bg-slate-300`}
      >
        <div
          className={`border border-slate-400 bg-blue-50 rounded-md w-[100%] sm:w-[80%] md:max-w-[500px] px-8 py-6 md:px-8 shadow-md flex flex-col`}
        >
          <button
            type="button"
            className="self-end"
            onClick={() => setShowMainPage(!showMainPage)}
          >
            <IoMdClose size={18} color="black" />
          </button>
          <form onSubmit={submitAddForm} className="space-y-4 mb-3">
            <div className="flex flex-col w-full space-y-1">
              <label
                htmlFor="title"
                className="text-[roboto] text-sm opacity-60"
              >
                Title
              </label>
              <input
                id="title"
                type="type"
                className="bg-slate-100 py-1 px-3 border border-slate-500 outline-none focus:shadow-sm focus:shadow-blue-300 rounded-[3px] opacity-70 placeholder:text-slate-600"
                value={inputHandle.title}
                onChange={(e) =>
                  setInputHandle({ ...inputHandle, title: e.target.value })
                }
                placeholder="Learn HTML"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label
                htmlFor="description"
                className="text-[roboto] text-sm opacity-60"
              >
                Description
              </label>
              <textarea
                id="description"
                type="type"
                className="bg-slate-100 py-1 px-3 border border-slate-500 outline-none focus:shadow-sm focus:shadow-blue-300 rounded-[3px] opacity-70 placeholder:text-slate-600"
                value={inputHandle.description}
                onChange={(e) =>
                  setInputHandle({
                    ...inputHandle,
                    description: e.target.value,
                  })
                }
                placeholder="Type a Description"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label
                htmlFor="title"
                className="text-[roboto] text-sm opacity-60"
              >
                Status
              </label>
              <select
                onChange={(e) =>
                  setInputHandle({ ...inputHandle, status: e.target.value })
                }
                value={inputHandle.status}
                className="bg-slate-100 py-1 px-3 border border-slate-500 outline-none focus:shadow-sm focus:shadow-blue-300 rounded-[3px] opacity-70 placeholder:text-slate-600"
              >
                {statusList.map((each) => (
                  <option key={each.id} id={each.id} value={each.status}>
                    {each.status}
                  </option>
                ))}
              </select>
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
                <span className="text-[roboto] font-medium">Add Todo</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTodo;



    // console.log(userDetails);

    // console.log(jwtToken);

    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${jwtToken}`,
    //   },
    //   body: JSON.stringify(userDetails),
    // };

    // console.log("Level 3");
    // const response = await fetch(apiUrl, options);
    // const data = await response.json();

    // console.log("Level 4");
    // const userId1 = localStorage.getItem("user_id");
    // const userName = localStorage.getItem("user_name");
    // console.log("Level 1");
    // console.log(userId1, userName);

    //   if (response.ok === true) {
    //     setShowErrorMsg("");
    //     setInputHandle({ title: "", description: "", status: "" });
    //     toast.success(data.message);
    //   } else {
    //     // console.log("It is returned Error");
    //     setShowErrorMsg(data.message);
    //     toast.error(data.message);
    //   }
    //   setIsLoading(false);
    //   setMainContent("");
    //   setShowMainPage(false);
    // };
