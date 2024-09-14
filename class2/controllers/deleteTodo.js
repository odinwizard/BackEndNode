const Todo = require("../models/todo.js")

exports.deleteTodo = async(req, res) => {
    try {
        const {id} = req.params;

        await Todo.findByIdAndDelete(id);
        res.json({
            success: true,
            message:"Todo DELETED Successfully",
        })
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json(
            {
                success: false,
                data:'Internal server error',
                message:error.message,
            }
        )
    }
}