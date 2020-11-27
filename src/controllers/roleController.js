const Role = require('../models/role')
const roleService = require('../service/role')

exports.addRole = function (req,res,next) {
    const role = new Role(req.body)
    role.role_name = req.body.role_name
    role.capabilities = req.body.capabilities

    roleService.createRole(role, function (error, response) {
        if (response) {
            res.status(200).send({statusCode: res.statusCode,success:true,message:"Tạo quyền thành công", data: response});
        } else if (error) {
            res.status(400).send({statusCode: res.statusCode,success:false, err: 'Thêm thất bại! ' + error});
        }
    });
}