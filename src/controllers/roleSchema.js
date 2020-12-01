const RoleModel = require('../models/roleModel')
// const Validation = require('../../includes/validation');

exports.addRole = async (req,res,next) => {
  try {
    let code = await Validation.canDoAction(
      req,
      'addRole'
    )
    if (code === messageCodes.ok.code) {
      const role = await new RoleModel({
        ...req.body
      }).save();
      return res.status(200).send({
        statusCode: res.statusCode,
        success:true,
        message:"Tạo quyền thành công",
        data: role
      })
    }
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      success:false,
      message: 'Lỗi kết nối!',
      data: []
    })
  }
}

exports.addCapabilities = async (req, res, next) => {
  //
}
