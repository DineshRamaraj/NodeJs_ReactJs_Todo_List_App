const TodoModel = require("../../models/TodoModel");

const GetAllTodo = async (req, res) => {
  const { user_id } = req.params;
  try {
    const todoList = await TodoModel.find({ user_id: user_id }).select("-__v -user_id");
    // console.log(todoList);
    if (todoList.length === 2) {
      return res
        .status(200)
        .json({
          status: "success",
          message: "No Todo Item",
          todo_list: todoList,
        });
    }
    return res
      .status(200)
      .json({
        status: "success",
        message: "Fetch Success",
        todo_list: todoList,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failure", message: "Fetched Failure" });
  }
};

module.exports = GetAllTodo;
