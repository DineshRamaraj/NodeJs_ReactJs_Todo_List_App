import React from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const DeleteTodo = ({ showMainPage, setShowMainPage, setMainContent }) => {
//   const [showErrorMsg, setShowErrorMsg] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

  const jwtToken = Cookies.get("jwt_token");
  const userId = localStorage.getItem("user_id");

  const submitDeleteForm = async () => {
    // setIsLoading(true);

    const todoId = localStorage.getItem("todoId");

    // const apiUrl = `https://dintodoapi.onrender.com/api/${userId}/todo/${todoId}`;

    const apiUrl = `https://nxt-todo-app.onrender.com/api/${userId}/todo/${todoId}`;

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok === true) {
    //   setShowErrorMsg("");
      toast.success(data.message);
    } else {
    //   setShowErrorMsg(data.message);
      toast.error(data.message);
    }
    localStorage.removeItem("todoId");
    // setIsLoading(false);
    setMainContent("");
    setShowMainPage(false);
  };

  return (
    <>
      <div
        className={`${
          showMainPage ? "absolute z-30" : "auto"
        } absolute min-h-[calc(100vh-50px)] flex flex-col justify-center items-center px-5 md:px-20 py-5 w-[100%] bg-slate-300`}
      >
        <div
          className={`border border-slate-400 bg-blue-50 rounded-md w-[100%] sm:w-[80%] md:max-w-[300px] px-8 py-6 md:px-8 shadow-md flex flex-col`}
        >
          <span className="text-md font-medium">Are You Sure to Delete?</span>
          <div className="flex justify-between items-center mt-5">
            <button
              className="bg-purple-500 px-5 py-2 rounded-md text-white"
              onClick={submitDeleteForm}
            >
              Delete
            </button>

            <button
              type="button"
              className="border-2 border-red-500 text-black px-4 py-1.5 rounded-md"
              onClick={() => {
                setShowMainPage(false);
                setMainContent("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTodo;
