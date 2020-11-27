const User = require('../models/user');
const jwt = require('jsonwebtoken')
const Role = require('../models/role')
const { Roles } = require('../models/user');


exports.createUser = async function (user, uid, callback) {
    User.findOne({ uid: uid }).then((data) => {
        if (data) {
            callback(data)
        } else {
            user
                .save(user)
                .then((response) => {
                    // callback(response,null)
                    // console.log(response)
                    callback(null, response)

                })
                .catch((error) => {
                    console.log(error)
                    //   console.log("LOI NE "+ error)
                    // console.log(error);
                });
        }
    });
}

exports.getIdUser = async function (idUser, callback) {


    await User.findOne({ _id: idUser }, callback).populate('roles', 'role_name')
};

exports.updatePhone =  function (idUser, phone, callback) {

    // User.findOne({phone:phone}).then((data) => {
    //     if (data.length !== 0){
    //         callback(data)

    //     }else {
    //         User.findOneAndUpdate(idUser,{phone:phone})
    //             .catch((err) => {
    //                 callback(err)
    //         }).then((user) => {
    //             if (!user) {

    //                 callback(user)
    //                 return user;
    //             } else {
    //                 callback(user)

    //             }
    //         })
    //     }
    //     })
    // User.findOneAndUpdate(idUser, { "phone": phone })
    //     .catch((err) => {
    //         callback(err)
    //     }).then((user) => {
    //         if (!user) {
    //             callback(user)
    //             return user;
    //         } else {
    //             callback(user)

    //         }
    //     })

    // User.findByIdAndUpdate(idUser,{"phone":phone},function (err,response){
    //     if(response){
    //         callback(response);
    //     }else{
    //         callback(err);
    //     }
    // })
}

exports.getListInnkeeper = async (callback) => {
    const role = await Role.findOne({ 'role_name': 'innkeeper' });
    await User.find({ roles: role._id }, function (err, result) {
        callback(err, result)
    }).populate('roles', 'role_name');
}


