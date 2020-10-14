const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    tasks: [{
        shortDesc: { type: String },
        longDesc: { type: String },
        dueDate: { type: String },
        done: { type: Boolean },
        createAt : { type: String },
    }]
});

const Task = module.exports = mongoose.model("Task", TaskSchema);


module.exports.addTask = function (newTask, callback) {
    newTask.save(callback)
}

module.exports.getTasks = function (callback) {
    Task.find(callback)
}

module.exports.deleteTask = function (id, callback) {
    Task.findByIdAndDelete(id, callback)
}

module.exports.updateTask = function (id, datas, callback) {
    Task.findByIdAndUpdate(id, datas, { new: true }, callback)
}
