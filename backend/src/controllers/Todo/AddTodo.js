const TodoModel = require("../../models/TodoModel");

const AddTodo = async (req, res) => {
  const { user_id } = req.params;
  console.log(req.body);
  const { title, description="This is My Description", status="Pending" } = req.body;
  console.log(description);
  try {
    if (title.length < 3 || title === "") {
      return res.status(404).json({ message: "Invalid Title" });
    }
    await TodoModel.create({
      user_id,
      title,
      description,
      status,
    });
    return res
      .status(201)
      .json({ status: "success", message: "Added To Your Todo List" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = AddTodo;
