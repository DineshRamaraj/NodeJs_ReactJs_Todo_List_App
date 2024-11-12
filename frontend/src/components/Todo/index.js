import React, { useEffect, useState } from "react";
import shortUUID from "short-uuid";
import CustomSpinner from "../Loading";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import TodoItem from "../TodoItem";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import EmptyList from "../EmtpyItem";

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

const Todo = () => {
  const [inputHandle, setInputHandle] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [todoIsLoading, setTodoIsLoading] = useState(false);
  const [showMainPage, setShowMainPage] = useState(false);
  const [mainContent, setMainContent] = useState("");
  //   console.log(inputHandle);

  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    const getTodoList = async () => {
      const userId = localStorage.getItem("user_id");

      setTodoIsLoading(false);
      const apiUrl = `https://dintodoapi.onrender.com/api/${userId}/todo`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok === true) {
        setTodoList(data.todo_list);
      }
      setTodoIsLoading(false);
    };

    if (jwtToken === undefined) {
      navigate("/login");
    }

    getTodoList();
  }, [isLoading, navigate, jwtToken]);

  const userId = localStorage.getItem("user_id");

  const submitAddForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const apiUrl = `https://dintodoapi.onrender.com/api/${userId}/todo`;

    const userDetails = {
      title: inputHandle.title,
      description: inputHandle.description || "This is My Description",
      status: inputHandle.status,
    };

    console.log(userDetails)

    // console.log(jwtToken);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userDetails),
    };

    // console.log("Level 3");
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    // console.log("Level 4");
    // const userId1 = localStorage.getItem("user_id");
    // const userName = localStorage.getItem("user_name");
    // console.log("Level 1");
    // console.log(userId1, userName);

    if (response.ok === true) {
      setShowErrorMsg("");
      setInputHandle({ title: "", description: "", status: "" });
      toast.success(data.message);
    } else {
      // console.log("It is returned Error");
      setShowErrorMsg(data.message);
      toast.error(data.message);
    }
    setIsLoading(false);
    setMainContent("");
    setShowMainPage(false);
  };

  const submitUpdateForm = async () => {
    setIsLoading(true);

    const todoId = localStorage.getItem("todoId");

    const apiUrl = `https://dintodoapi.onrender.com/api/${userId}/todo/${todoId}`;

    const userDetails = {
      title: inputHandle.title,
      description: inputHandle.description,
      status: inputHandle.status,
    };

    // console.log(jwtToken);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok === true) {
      setShowErrorMsg("");
      setInputHandle({ title: "", description: "", status: "" });
      toast.success(data.message);
    } else {
      setShowErrorMsg(data.message);
      toast.error(data.message);
    }
    localStorage.removeItem("todoId");
    setIsLoading(false);
    setMainContent("");
    setShowMainPage(false);
  };

  const submitDeleteForm = async () => {
    setIsLoading(true);

    const todoId = localStorage.getItem("todoId");

    const apiUrl = `https://dintodoapi.onrender.com/api/${userId}/todo/${todoId}`;

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
      setShowErrorMsg("");
      toast.success(data.message);
    } else {
      setShowErrorMsg(data.message);
      toast.error(data.message);
    }
    localStorage.removeItem("todoId");
    setIsLoading(false);
    setMainContent("");
    setShowMainPage(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-50px)] flex flex-col items-center px-5 md:px-20 py-5">
      {showMainPage && (mainContent === "Add" || mainContent === "Update") && (
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
                {mainContent === "Add" && (
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
                )}
                {mainContent === "Update" && (
                  <button
                    disabled={isLoading}
                    type="button"
                    className={`px-5 py-2 bg-blue-600 font-sans text-white rounded-lg ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    } flex items-center`}
                    onClick={submitUpdateForm}
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
                    <span className="text-[roboto] font-medium">
                      Update Todo
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {showMainPage && mainContent === "Delete" && (
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
                className="border border-red-400 text-black px-5 py-2 rounded-md"
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
      )}
      <div className="pt-5 w-full">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-slate-900 text-[roboto] font-medium">
            TODOLIST:
          </h1>
          <button
            type="button"
            className="px-5 py-2 bg-blue-600 font-sans text-white text-[roboto] rounded-lg flex items-center"
            onClick={() => {
              setMainContent("Add");
              setShowMainPage(true);
            }}
          >
            + Add Task
          </button>
        </div>
        {todoList.length > 0 && (
          <div>
            {todoIsLoading && (
              <CustomSpinner size={20} borderColor="blue" borderWidth={3} />
            )}
            {!todoIsLoading && (
              <ul className="pl-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[100%] gap-3">
                {todoList.map((each) => {
                  return (
                    <TodoItem
                      key={each._id}
                      todoItem={each}
                      statusList={statusList}
                      setMainContent={setMainContent}
                      setShowMainPage={setShowMainPage}
                      setInputHandler={setInputHandle}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        )}
        
        {todoList.length === 0 && <EmptyList />}
      </div>
    </div>
  );
};

export default Todo;
