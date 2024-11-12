const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "This is My Description"
    },
    status: {
        type: String,
        default: "pending"
    }
}, {timestamps: true})

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;