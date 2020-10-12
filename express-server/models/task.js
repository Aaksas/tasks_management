const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    name : {
        type: String,
        unique: true
    },
});

const Task = module.exports = mongoose.model("Task", TaskSchema);


module.exports.addTask = function(newTask, callback){
    newTask.save(callback)
}

module.exports.getTasks = function(callback){
    Task.find(callback)
}

module.exports.deleteTask = function(id ,callback){
    Task.findByIdAndDelete(id , callback)
}
