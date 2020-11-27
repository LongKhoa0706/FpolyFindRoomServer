const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesQuan = new Schema({
    name:{
        requires: true,
        type :String,
    },
    images:{
        requires: true,
        type :String,
    }

})

const categoriesQuann = mongoose.model('categoriesQuan',categoriesQuan)
module.exports = categoriesQuann