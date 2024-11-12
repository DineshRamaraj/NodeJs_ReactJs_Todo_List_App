const TodoModel = require("../../models/TodoModel")

const DeleteTodo = async (req, res) => {
    const {user_id, todo_id} = req.params;
    try{
        const checkTodoItem = await TodoModel.findOne({_id: todo_id, user_id: user_id});

        if(!checkTodoItem){
            return res.status(404).json({status: "failure", message: "Invalid Todo Item"});
        }

        await TodoModel.deleteOne({_id: todo_id, user_id: user_id});
        return res.status(200).json({status: "success", message: "Delete Success"});
    }
    catch(error){
        return res.status(500).json({status: "failure", message: error.message});
    }
}

module.exports = DeleteTodo;