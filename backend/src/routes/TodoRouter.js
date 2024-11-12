const express = require("express");
const AddTodo = require("../controllers/Todo/AddTodo");
const UserActive = require("../controllers/Middleware/UserActive");
const AuthenticateToken = require("../controllers/Middleware/AuthenticateToken");
const GetAllTodo = require("../controllers/Todo/GetAllTodo");
const GetSingleTodo = require("../controllers/Todo/GetSingleTodo");
const UpdateTodo = require("../controllers/Todo/UpdateTodo");
const DeleteTodo = require("../controllers/Todo/DeleteTodo");
const TodoRouter = express();

TodoRouter.post("/:user_id/todo", UserActive, AuthenticateToken, AddTodo);
TodoRouter.get("/:user_id/todo", UserActive, AuthenticateToken, GetAllTodo);
TodoRouter.get("/:user_id/todo/:todo_id", UserActive, AuthenticateToken, GetSingleTodo);
TodoRouter.put("/:user_id/todo/:todo_id", UserActive, AuthenticateToken, UpdateTodo);
TodoRouter.delete("/:user_id/todo/:todo_id", UserActive, AuthenticateToken, DeleteTodo);


module.exports = TodoRouter;
