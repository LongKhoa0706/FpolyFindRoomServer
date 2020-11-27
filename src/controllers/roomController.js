const Room = require('../models/room')
const roomService = require('../service/room')
const Validation = require('../includes/validation')
const e = require('express')

exports.addRoom = async function (req,res,next) {
    try{
        let code = await Validation.canDoAction(
            req,
            "createRoom"
        );
        if(code == 200){
            const room = new Room(req.body)
            room.name = req.body.name
            room.price = req.body.price
            room.address = req.body.address
            room.phone = req.body.phone
            room.status = false 
            room.description = req.body.description
            room.capacity = req.body.capacity
            room.acreage = req.body.acreage
            room.datepost = req.body.datepost
            room.latitude = req.body.latitude
            room.longitude = req.body.longitude
            room.categoriesRoom = req.body.categoriesRoom
            room.categoriesQuan = req.body.categoriesQuan
            room.iduser = req.body.iduser
            room.images = req.body.images
            room.util = req.body.util
        
            roomService.createRoom(room, function (error, response) {
                if (response) {
                    res.status(200).send({statusCode: res.statusCode,success:true,message:"Tạo phòng thành công", data: response});
                } else if (error) {
                    res.status(400).send({statusCode: res.statusCode,success:false, err: 'Thêm thất bại! ' + error});
                }
            });
        }else{
            res.status(400).send({statusCode: res.statusCode,message: "Không có quyền thêm phòng trọ",success: false, data:  e});
        }
    } catch(e){
        res.status(400).send({statusCode: res.statusCode,message: e,success: false, data:  e});

    }

}


exports.listDetailRoom = function (req,res) {
    roomService.getRoom(req.params.id,function (err, response) {
        if (response) {
            console.log(response)
            res.status(200).send({statusCode: res.statusCode,success: true, data: response});
        } else if (err) {
    
            res.status(400).send({statusCode: res.statusCode,success: false, data:  err});
        }
    })
}

exports.listGetAllRoom = async (req,res) => {
    try {
        let code = await Validation.canDoAction(
            req,
            "getAllRoom"
        );
        if (code === 200) {
            roomService.getAll(function (err,response) {
                if (response) {
                    console.log(response)
                    res.status(200).send({statusCode: res.statusCode,success: true,messages: 'Lấy danh sách thành công!', data: response});
                } else if (err) {
                    console.log(err)
                    res.status(400).send({statusCode: res.statusCode,messages: 'Lấy danh sách thất bại !',success: false, data:  err});
                }
            })
        } else {
         
            res.status(400).send({statusCode: res.statusCode,success: false, data:  e});
        }
    } catch (e) {
        
        res.status(400).send({statusCode: res.statusCode,success: false, data:  e});
    }
}

exports.listGetRoomForUser = async (req,res) => {
    try {
        let code = await Validation.canDoAction(
            req,
            "getAllRoomForUser"
        );
        if (code === 200) {
            roomService.getRoomForUser(req.params.id,function (err,response) {
                if (response){
                    res.status(200).send({statusCode: res.statusCode,success: true,messages : "Lấy danh sách thành công ", data: response});
    
                }else {
                    res.status(400).send({statusCode: res.statusCode,success: false,messages: "Lấy danh sách thất bại ", data: err});
                }
            })
        } else {
            res.status(400).send({statusCode: res.statusCode,success: false, data:  e});
        }
    } catch (e) {
        res.status(400).send({statusCode: res.statusCode,success: false, data:  e});
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        let code = await Validation.canDoAction(
            req,
            "deleteRoom"
        );
        if (code === 200) {
            // Kiểm tra tồn tại
            const roomExists = await Room.findById(req.params.id).populate('iduser');
            if (roomExists) {
                if (roomExists.iduser.socialType == 'facebook') {
                    if (roomExists.iduser.idFacebook == req.body.idSocial.trim()) {
                        const deleted = await Room.findByIdAndDelete(req.params.id);
                        return res.status(200).send({ statusCode: res.statusCode, success: true, messages: 'Xóa thành công rồi đó cô bé', data: deleted });
                    }
                } else if (roomExists.iduser.socialType == 'google') {
                    if (roomExists.iduser.idGoogle == req.body.idSocial.trim()) {
                        const deleted = await Room.findByIdAndDelete(req.params.id);
                        return res.status(200).send({ statusCode: res.statusCode, success: true, messages: 'Xóa thành công rồi đó cô bé', data: deleted });
                    }
                } else {
                    res.status(401).send({statusCode: res.statusCode,success: false,messages: "Bạn không thể thực hiện hành động này ", data: null});
                }
            } else {
                res.status(404).send({statusCode: res.statusCode,success: false,messages: "Phòng trọ không tồn tại", data: null});
            }
        }
    } catch (e) {
        res.status(400).send({statusCode: res.statusCode,success: false, data:  e});
    }
}
