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






app.listen(port, () => {console.log('Api Runing di port ' + port)})