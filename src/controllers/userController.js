const userService = require('../service/user')
const User = require('../models/user')
const Role = require('../models/role')
const roomService = require('../service/room')
const e = require('express')

exports.addUser = async (req, res) => {
    // const user = new User(req.body);
    var user = {};
    user.avatar = req.body.avatar == null ? 'https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png' : req.body.avatar,
    user.name = req.body.name,
    user.email = req.body.email,
    user.phone = req.body.phone == null ? null :req.body.phone,
    user.verifi = req.body.verifi,
    // Set chu tro hay nguoi dung
    user.typeUser = req.body.typeUser,// 1 is innkeeper, 0 is customer
    // Id social
    user.idSocial = req.body.idSocial.trim(),
    user.socialType = req.body.socialType.trim()

    // Chia file sap chia di
    const phoneIsExists = await User.findOne({phone: user.phone});
    if (!phoneIsExists) {
        var users = null;
        if (user.socialType == 'facebook') {
            users = await User.findOne({ $and: [{ socialType: user.socialType }, { idFacebook: user.idSocial }] });
            if (users) {
                return res.status(200).send({ statusCode: res.statusCode, success: true, messages: 'Cmm Tài khoản đã tồn tại', data: [] });;
            }
            user.idFacebook = user.idSocial
        } else {
            users = await User.findOne({ $and: [{ socialType: user.socialType }, { idGoogle: user.idSocial }] });
            if (users) {
                return res.status(400).send({ statusCode: res.statusCode, success: false, messages: 'Cmm Tài khoản đã tồn tại', data: [] });;
            }
            user.idGoogle = user.idSocial
        }
        if (!users) {
            if (user.typeUser == 1) {
                let roles = await Role.findOne({ role_name: 'innkeeper' });
                user.roles = [roles.id];
            } else {
                let roles = await Role.findOne({ role_name: 'customer' });
                user.roles = [roles.id];
            }
            const newUser = await new User(user).save();

            return res.status(200).send({ statusCode: res.statusCode, success: true, messages: 'Tạo tài khoản thành công', data: newUser });
        } else {
            return res.status(200).send({ statusCode: res.statusCode, success: true, messages: 'Cmm Tài khoản đã tồn tại', data: [] });;
        }
    } else {
        return res.status(200).send({ statusCode: res.statusCode, success: true, messages: 'Cmm Tài khoản đã tồn tại', data: [] });
    }
}

exports.getIdUserr = function (req, res) {

    userService.getIdUser(req.params.id, (error, response) => {
        if (response) {
            res.status(200).send({ statusCode: res.statusCode,success: true,messages: "Thành công ", data: response });
            return
        } else {
            console.log(error)
            res.status(400).send({ statusCode: res.statusCode, success: false,messages: "Tài khoản không tìm thấy"  });
            return
        }
    })
}

exports.updatePhonee =  async function (req, res) {
   await User.findByIdAndUpdate({_id: req.params.id},{"phone":req.body.phone}, (err,response)=>{
        if(response){
            console.log(req.body.phone)
            res.status(200).send({ statusCode: res.statusCode,success: true,data: response})
        }else{
            res.status(400).send({ statusCode: res.statusCode,success: false,message: 'Tài khoản không tìm thấy ',data: err});
        }
    })
    // userService.updatePhone('5fa7675bbbfc28250e425d9a', req.body.phone, function (err, response) {
    //     if (response) {

    //         res.status(200).send({ statusCode: res.statusCode,success: true,message: "Thành Công", data: response });
    //     } else if (err) {
    //         console.log(err)
    //         res.status(400).send({ statusCode: res.statusCode,success: false,message: 'Tài khoản không tìm thấy '  });
    //     }
    // })
}

exports.getListInnkeeper = async function (req, res) {
    userService.getListInnkeeper(function (err,response){
        if(response){
            console.log(response)
            res.status(200).send({statusCode: res.statusCode, message: "Lấy danh sách thành công ",success: true, data: response})
        }else if (err){
            console.log(err)
            res.status(400).send({statusCode: res.statusCode,message: "Lấy danh sách thất bại  ",success:false})
        }
    })
}

exports.bookRoom = async function(req,res){
    roomService.bookRoom('5fa758bf853acb0a88758e09',function(err,response){
        if (response) {
            res.status(200).send({ statusCode: res.statusCode,success: true, message:"Đặt phòng trọ thành công",data: response });
        } else if (err) {
            res.status(400).send({ statusCode: res.statusCode,success: false,message: 'Đăt phòng trọ thất bại' +err });
        }
    })
}