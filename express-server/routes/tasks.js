const express = require("express");
const router = express.Router();
const passport = require ("passport");
const jwt = require ("jsonwebtoken");
const Task = require("../models/task");
const config = require("../config/database");

router.post("/createTask", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    let newTask = new Task({
        name: req.body.name,
    });
    Task.addTask(newTask, (err, data)=> {
        if(err){
            res.json({success: false, msg: err.message});
        }
        else {
            res.json({success: true, msg: "Task Created."});
        }
    });
});

router.get("/findtasks", passport.authenticate("jwt", {session: false}), (req, res, next)=>{
    Task.getTasks((err , data)=>{
        console.log('data',data);
        res.json(data)
    })
});

router.delete("/delete/:id" , passport.authenticate("jwt", {session: false}), (req, res, next)=>{
    Task.deleteTask( req.params.id , (err , data)=>{
        res.json(data)
    })
});


module.exports = router;