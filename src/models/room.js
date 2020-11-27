const mongoose = require('mongoose')
const Schema = mongoose.Schema

const room = new Schema({
    name: {
        requires: true,
        type: String,
    },
    price: {
        requires: true,
        type: Number,
    },
    address: {
        requires: true,
        type: String,
    },
    phone: {
        requires: true,
        type: String,
    },
    description: {
        requires: true,
        type: String,
    },
    capacity: {
        requires: true,
        type: String,
    },
    acreage: {
        requires: true,
        type: String,
    },
    datepost: {
        requires: true,
        type: String,
    },
    status: {
        requires: true,
        type: Boolean,
    },
    latitude: {
        requires: true,
        type: String,
    },
    longitude: {
        requires: true,
        type: String,
    },
    categoriesRoom: {
        type: Schema.Types.ObjectId,
        ref: "categoriesRoom",
        requires: true,
    },
    categoriesQuan: {
        type: Schema.Types.ObjectId,
        ref: "categoriesQuan",
    },
    iduser: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },

    images: [
        {
            type:String
        }
    ],
    util: [
        {
            type: Schema.Types.ObjectId,
            ref: 'utils'
        }
    ],
    create_at:{
        type: Date,
        default: Date.now,
        require: true,
    },
    update_at:{
        type: Date,
        default: Date.now,
        require: true,
    },

})
const Room = mongoose.model('room', room)
module.exports = Room