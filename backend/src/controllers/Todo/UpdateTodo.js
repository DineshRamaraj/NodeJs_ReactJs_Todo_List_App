const TodoModel = require("../../models/TodoModel");

const UpdateTodo = async (req, res) => {
  const { todo_id, user_id } = req.params;
  const { title, description, status } = req.body;
  try {
    const checkTodoItem = await TodoModel.findOne({
      _id: todo_id,
      user_id: user_id,
    });
    if (!checkTodoItem) {
      return res
        .status(404)
        .json({ status: "success", message: "Invalid Todo Item" });
    }

    // const updateFields = {};
    // if(title) updateFields.title = title;
    // if(description) updateFields.description = description;
    // if(status) updateFields.status = status;

    if (
      title === checkTodoItem.title &&
      description === checkTodoItem.description &&
      status === checkTodoItem.status
    ) {
      return res
        .status(400)
        .json({ status: "failure", message: "No Changes Made to the Item" });
    }

    const updatedItem = await TodoModel.updateOne(
      {
        _id: todo_id,
        user_id: user_id,
      },
      {
        $set: {
          title: title || checkTodoItem.title,
          description: description || checkTodoItem.description,
          status: status || checkTodoItem.status,
        },
      }
    );

    // console.log(updatedItem);
    // console.log(updatedItem.nModified);

    if (updatedItem.nModified === 0) {
      return res
        .status(400)
        .json({ status: "failure", message: "No Changes Made to the Item" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Updated Success" });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
};

module.exports = UpdateTodo;
