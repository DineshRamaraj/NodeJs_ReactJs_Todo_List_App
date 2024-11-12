const TodoModel = require("../../models/TodoModel");

const GetSingleTodo = async (req, res) => {
  const { todo_id, user_id } = req.params;
  try {
    const todoItem = await TodoModel.findOne({
      _id: todo_id,
      user_id: user_id,
    }).select("-__v -user_id");

    if (!todoItem) {
      return res
        .status(404)
        .json({ status: "success", message: "Invalid Todo Item" });
    }
    return res.status(200).json({
      status: "success",
      message: "Fetched TodoItem Success",
      todoItem,
    });
  } catch (error) {
    return res.status(404).json({ status: "failure", message: error.message });
  }
};

module.exports = GetSingleTodo;
