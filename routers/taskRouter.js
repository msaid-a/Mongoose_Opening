const express = require('express')
const router = new express.Router()


// T A S K 
const Task = require('../models/taskModels')
const User = require('../models/userModels')
// Create Task
router.post('/tasks/:userid', async(req,res) => {
    
    try {
        let user = await User.findById(req.params.userid)
        let task =  new Task ({
            description : req.body.description,
            owner : user._id
        })
        // simpan _id task yang baru ke array task pada user 
        user.tasks.push(task._id)
        // sipan user dan task ke database
        await user.save()
        await task.save()
        res.send({
            owner : {
                name : user.name,
                id : user._id,  
            },
            creteredTask : {
                description : task.description,
                id : task._id,
                owner : task.owner
            }

        })
        
    } catch (error) {
        res.send(error.message)
    }
  
})

// Update
router.patch('/tasks/:taskid', async(req, res) => {

    try {
        let task = await Task.findById(req.params.taskid)
        task.completed = true
        
        await task.save()

        res.send({updateTask : task})
    } catch (error) {
        res.send(error)
    }

})

// Delete Task
router.delete('tasks/:tasksid', async(req, res) =>{
    try {
        let task = await Task.findByIdAndDelete(req.params.taskid)
        res.send({deletedTask : task})
    } catch (error) {
        res.send(error)
    }
})

module.exports = router