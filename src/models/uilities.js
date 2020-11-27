const mongoose = require('mongoose')
const Schema = mongoose.Schema

const util = new Schema({
    name:{
        requires: true,
        type:String,
    },
    images:{
        requires: true,
        type:String,
    }
})

const Utils = mongoose.model('utils',util)
module.exports = Utils