import React, { useEffect, useState } from "react";
import shortUUID from "short-uuid";
import CustomSpinner from "../Loading";
import Cookies from "js-cookie";
// import { toast } from "react-hot-toast";
import TodoItem from "../TodoItem";
import { useNavigate } from "react-router-dom";
import EmptyList from "../EmtpyItem";
import UpdateTodo from "../UpdateTodo";
import AddTodo from "../AddTodo";
import DeleteTodo from "../DeleteTodo";

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
  // const [showErrorMsg, setShowErrorMsg] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
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

      const apiUrl = `https://nxt-todo-app.onrender.com/api/${userId}/todo`;

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
  }, [navigate, jwtToken, showMainPage]);


  return (
    <div className="relative min-h-[calc(100vh-50px)] flex flex-col items-center px-5 md:px-20 py-5">
      {showMainPage && mainContent === "Update" && (
        <UpdateTodo
          setMainContent={setMainContent}
          setShowMainPage={setShowMainPage}
          showMainPage={showMainPage}
          inputValues={inputHandle}
        />
      )}
      {showMainPage && mainContent === "Add" && (
        <AddTodo
          setMainContent={setMainContent}
          setShowMainPage={setShowMainPage}
          showMainPage={showMainPage}
        />
      )}
      {showMainPage && mainContent === "Delete" && (
        <DeleteTodo
          showMainPage={showMainPage}
          setShowMainPage={setShowMainPage}
          setMainContent={setMainContent}
        />
      )}
      <div className="pt-5 w-full">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-slate-900 text-[roboto] font-medium">
            TODOLIST:
          </h1>
          <button
            type="button"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            onClick={() => {
              setMainContent("Add");
              setShowMainPage(true);
            }}
          >
            <span className="text-lg font-medium">+</span> Add Task
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
