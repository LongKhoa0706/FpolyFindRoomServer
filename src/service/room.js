
const room1 = require('../models/room')
const mongoose = require('mongoose')
const  userr = require('../models/user')
const categoriesRoomm = require('../models/categoriesRoom');
const e = require('express');


exports.createRoom = function (roomm, callback) {
    roomm.save().then((response) => {
        callback(null, response);

    }, (error) => {
        callback(error, null);
    });
};

exports.updateRoom = async function (idRoom,callback) {
    
}

exports.getRoom =  async function (id,callback) {
  await room1.find({_id: id},(error, result)=> {
      console.log(error);
      callback(error, result);
    })
      .where('categoriesRoom').populate({
        path: "categoriesRoom",
        select: "name",
    }).populate({
        path: "iduser",
        select: "email && name && phone && avatar",
    }).populate({
        path:"categoriesQuan",
        select: "name && images",
    })

}
exports.getRoomForUser = async function (iduser,callback) {
     room1.find({iduser:iduser},(err,result) => {
        callback(err,result)
    }).populate({
        path: "iduser"
    }).populate({
        path: "util",
        select: "name",
    }).populate({
        path: "categoriesQuan",
        select: "name && images",
    }).populate({
        model: categoriesRoomm,
        path: "categoriesRoom",
        select: "name",
    })
}

exports.getAll =  async function (callback) {
    await room1.find({}, function (err, result) {
        callback(err, result)
    }).sort({price: -1}).populate({
        path: "categoriesQuan",
        select: "name && images",
    }).populate({
        model: categoriesRoomm,
        path: "categoriesRoom",
        select: "name",
    }).populate({
        path: "iduser", // quan trọng path nó phải trùng json
        select: ['name', 'avatar', 'phone', 'email'],
    }).populate({
        path: "util",
        select: "name",
    })

}

exports.bookRoom = async function (roomId,callback)  {
    room1.findByIdAndUpdate(
        roomId,
        {
            status:true
        },
        {
            new: true
        }
    ).then( (response) => {
        callback(null, response)
    })
}

