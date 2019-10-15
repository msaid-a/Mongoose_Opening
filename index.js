const express = require('express')
const mongoose = require('mongoose')

const User = require('./models/userModels')

const app = express()
const port = 2019
const URL = 'mongodb://localhost:27017/bdg-mongoose'

mongoose.connect(URL, {
    // Menguunakan parse baru
    useNewUrlParser : true,
    // menggunakan method baru 'Create Index' untuk membuat index setiap kaliinput sebuah data
    useCreateIndex : true,
    // Menggunakan method baru untuk prosess findOneAndUpdate()
    useFindAndModify : true,
    // Menggunakan engine mongodb baru
    useUnifiedTopology: true
})

app.use(express.json())

// Create one User
app.post('/users',(req,res) => {

    const user = new User(req.body)
     user.save()
        .then(()=> res.send('Data Berhasil Di Simpan'))
        .catch((err) => {res.send(err)})

})

// reade One User
app.get('/users/:userid', async (req,res)=> {
    try{
        const resp = await User.findById(req.params.userid)
        res.send(resp)
    }catch(e){
        res.send(err)
    }
})

// read All user
app.get('/users', async (req,res)=> {
    try{
        const resp = await User.find({})
        res.send(resp)
    }catch(e){
        res.send(err)
    }
})


// Delete one by id
app.delete('/users/:userid', async (req,res)=> {
    try{
        const resp = await User.deleteOne({_id : req.params.userid})
        res.send(resp)
    }catch(e){
        res.send(err)
    }
})
// update by id

app.patch('/users/:userid', async (req,res)=> {
    try{
        const resp = await User.updateOne({_id : req.params.userid},{age:12})
        res.send(resp)
    }catch(e){
        res.send(err)
    }
})

// ES 5 : callback
// ES 6 : Promise -> catch then
// ES 7 : Async Await


// Login 
app.post('/users/login', async(req,res)=>{
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

app.listen(port, () => {console.log('Api Runing di port ' + port)})