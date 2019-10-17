const express = require('express')
const router = new express.Router()
// U S E R
const User = require('../models/userModels')

// Create one User
router.post('/users',(req,res) => {

    const user = new User(req.body)
     user.save()
        .then(()=> res.send('Data Berhasil Di Simpan'))
        .catch((err) => {res.send(err)})

})

// reade One User
router.get('/users/:userid', async (req,res)=> {
    try{
        const resp = await User.findById(req.params.userid)
        res.send(resp)
    }catch(e){
        res.send(err)
    }
})

// read All user
router.get('/users', async (req,res)=> {
    try{
        const resp = await User.find({})
        res.send(resp)
    }catch(e){
        res.send(err)
    }
})


// Delete one by id
router.delete('/users/:userid', async (req,res)=> {
    try{
        const resp = await User.deleteOne({_id : req.params.userid})
        res.send(resp)
    }catch(err){
        res.send(err)
    }
})
// update Profile

router.patch('/users/:userid', async (req,res)=> {
    let update = Object.keys(req.body) //[name, email, ...]
    const allowedUpdates = ['name', 'email', 'password', 'age']

    let hasil = update.every(update => {
        return allowedUpdates.includes(update)
    })

    if(!hasil){
        return res.send({err: "Invalid Request"})
    }

    try{
        let user = await User.findById(req.params.userid)
        // update
        update.forEach(val => {
            user[val] =req.body[val]
        })
        await user.save()
        res.send('done di update')
    }catch(err){
        res.send(err)
    }
})

// ES 5 : callback
// ES 6 : Promise -> catch then
// ES 7 : Async Await


// Login 
router.post('/users/login', async(req,res)=>{
    try {
        let result = await User.login(req.body.email, req.body.password)
        res.send({
                condition : "berhasil login ",
                pesan : result
            })
    } catch (error) {
        res.send(error.message)
    }
})
module.exports = router