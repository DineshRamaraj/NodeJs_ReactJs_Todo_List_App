import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const TodoItem = ({
  todoItem,
  setShowMainPage,
  setMainContent,
  setInputHandler,
}) => {
  const { _id, title, description, status } = todoItem;
  //   const updateTodo = () => {};
  //   const deleteTodo = () => {};
  return (
    <>
      <div className="border border-slate-400 rounded-md p-4 w-[100%] flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-slate-800 text-md font-semibold text-[roboto] w-[90%]">
              {title.slice(0, 12)}
              {title.length > 12 && "..."}
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowMainPage(true);
                  setMainContent("Update");
                  setInputHandler({ title, description, status });
                  localStorage.setItem("todoId", _id);
                }}
              >
                <MdEdit size={18} color="blue" title="Edit" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMainPage(true);
                  setMainContent("Delete");
                  localStorage.setItem("todoId", _id);
                }}
              >
                <MdDelete size={18} color="red" title="Delete" />
              </button>
            </div>
          </div>
          <div>
            <span className="text-sm text-slate-400 font-thin">
              {description.slice(0, 50)}
              {description.length > 50 && "..."}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <span
            className={`${
              status === "Pending"
                ? "rounded-full bg-red-600"
                : status === "Progress"
                ? "rounded-full bg-yellow-400"
                : "rounded-full bg-green-600"
            } p-1 mr-1`}
          ></span>
          <span className="text-[12px] text-slate-400 font-light">
            {status}
          </span>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
