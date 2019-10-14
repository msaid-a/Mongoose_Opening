const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type : String,
        set : (val) => { return val.replace(/ /g, '') },// val = data dari user, menghapus semua spasi
        validate(val){
            // 
            val = parseInt(val)
            // akan bernilai true jika inputan user sbuah angka
            if(!isNaN(val)){
                throw new Error("Username Harus Merupakan sebuah string")
            }
        }
        
    },
    name : {
        type : String,
        required :true, //Wajib di isi
        trim : true, // menghapus spasi di awal dan di akhir kalimay
        validate(val){
            // 
            val = parseInt(val)
            // akan bernilai true jika inputan user sbuah angka
            if(!isNaN(val)){
                throw new Error("Name Harus Merupakan sebuah string")
            }
        }
    },
    password : {
        type: String,
        required: true,
        trim :true,
        minlength: 7, //minimal karakter
        validate(val){}
    },
    age : {
        type: Number,
        set: val => parseInt(val),
        default : 0 //jika user tidak menginput informasi   
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User