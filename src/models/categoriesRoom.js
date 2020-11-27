const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesRoom = new Schema({
    name:{
        requires: true,
        type :String,
    }  
})

const categoriesRoomm = mongoose.model('categoriesRoom', categoriesRoom);
module.exports = categoriesRoomm;




