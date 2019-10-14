const express = require('express')
const mongoose = require('mongoose')
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



app.listen(port, () => {console.log('Api Runing di port ' + port)})