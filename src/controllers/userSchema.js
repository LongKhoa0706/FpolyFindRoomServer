const jwt = require('jsonwebtoken')
const brcypt = require('bcryptjs')
// ----------------------------
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
// ----------------------------
const {DEFAULT_SECRECT_KEY, TOKEN_EXPIRED} = require('../includes/default')


exports.checkPhone = async (req, res) => {
  try {
    if (req.body.phone != undefined && req.body.phone != null && req.body.phone != '') {
      const phone = await UserModel.findOne({'phone': req.body.phone})
      if (phone) {
        return res.status(200).send({
          statusCode: res.statusCode,
          message: 'Tài khoản này đã được đăng ký ', 
          success: true, 
          data: phone
        })
      } else {
        return res.status(200).send({
          statusCode: res.statusCode,
          message: 'Số điện thoại này chưa được đăng ký', 
          success: true, 
          data: true
        })
      }
    } else {
      return res.status(400).send({
        statusCode: res.statusCode, 
        message: 'Vui lòng nhập số điện thoại ', 
        success: false, 
        data: null
      })
    }
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false, data: null
    })
  }
}

exports.register = async (req, res) => {
  try {
    if (req.body.phone != undefined && req.body.phone != null && req.body.phone != '') {
      const phone = await UserModel.findOne({'phone': req.body.phone})
      const email = await UserModel.findOne({'email': req.body.email})
      if (phone) {
        return res.status(400).send({
          statusCode: res.statusCode,
          message: 'Phone number already in use', 
          success: false, 
          data: null
        })
       } else if (email) {
        return res.status(400).send({
          statusCode: res.statusCode,
          message: 'Email already in use', 
          success: false, 
          data: null
        })
      } else {
        req.body.password = await brcypt.hashSync(req.body.password)
        const customer = await RoleModel.findOne({'role_name': 'customer'})
        req.body.roles = [customer._id]
        const user = await new UserModel(req.body).save()
        const dataUser = await UserModel.findById(user._id).populate('roles','role_name')
        return res.status(200).send({
          statusCode: res.statusCode,
          success: true, 
          data: dataUser
        })
      }
    } else {
      return res.status(400).send({
        statusCode: res.statusCode, 
        message: 'Please enter the phone number', 
        success: false, 
        data: null
      })
    }
  } catch (err) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    })
  }
}

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ phone: req.body.phone })
    if (user) {
      const isEqual = await brcypt.compare(req.body.password, user.password)
      if (isEqual) {
        const token = jwt.sign({ userId: user.id, phone: user.phone }, DEFAULT_SECRECT_KEY, {expiresIn: TOKEN_EXPIRED})
        return res.status(200).send({
          statusCode: res.statusCode,
          message: 'Đăng nhập thành công',
          success: true,
          data: {
            ...user._doc,
            token: token
          }
        })
      } else {
        return res.status(400).send({
          statusCode: res.statusCode,
          message: 'Mật khẩu không chính xác ',
          success: false,
          data: null
        })
      }
    }
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Số điện thoại chưa được đăng ký ',
      success: false,
      data: null
    })
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    })
  }
}

exports.profile = async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.headers.authorization, DEFAULT_SECRECT_KEY)
    if (decodedToken) {
      const user = await UserModel.findById(decodedToken.userId).populate('roles')
      return res.status(200).send({
        statusCode: res.statusCode,
        message: 'Profile success',
        success: true,
        data: user
      })
    } else {
      return res.status(401).send({
        statusCode: res.statusCode,
        message: 'Please log in',
        success: false,
        data: null
      })
    }
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    })
  }
}

exports.updateRole = async (req, res) => {
  try {
    if (req.headers.authorization == null || req.headers.authorization == undefined || req.headers.authorization == '') {
      return res.status(401).send({
        statusCode: res.statusCode,
        message: 'Please log in',
        success: false,
        data: null
      })
    }
    const decodedToken = jwt.verify(req.headers.authorization, DEFAULT_SECRECT_KEY)
    if (decodedToken) {
      const role = await RoleModel.findOne({'role_name': req.body.role_name})
      if (role) {
        const user = await UserModel.findByIdAndUpdate(decodedToken.userId, {
          roles: [role.id]
        }, {
          new: true
        })
        return res.status(200).send({
          statusCode: res.statusCode,
          message: 'Profile success',
          success: true,
          data: user
        })
      } else {
        return res.status(404).send({
          statusCode: res.statusCode,
          message: 'Not found role',
          success: false,
          data: null
        })
      }
    } else {
      return res.status(401).send({
        statusCode: res.statusCode,
        message: 'Please log in',
        success: false,
        data: null
      })
    }
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    if (req.headers.authorization == null || req.headers.authorization == undefined || req.headers.authorization == '') {
      return res.status(401).send({
        statusCode: res.statusCode,
        message: 'Please log in',
        success: false,
        data: null
      })
    }
    const decodedToken = jwt.verify(req.headers.authorization, DEFAULT_SECRECT_KEY)
    if (decodedToken) {
      const user = await UserModel.findByIdAndUpdate(decodedToken.userId, {
        ...req.body
      }, {
        new: true
      })
      return res.status(200).send({
        statusCode: res.statusCode,
        message: 'Update success',
        success: true,
        data: user
      })
    }
    return res.status(401).send({
      statusCode: res.statusCode,
      message: 'Please log in',
      success: false,
      data: null
    })
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    })
  }
}

// exports.getListInnkeeper = async (req,res) => {
//   try{
//     const innkeeper = await UserModel.findOne(roles)
//     if(innkeeper){
//       return res.status(200).send({
//         statusCode: res.statusCode,
//         message: 'Lấy danh sách thành công',
//         success: true,
//         data: innkeeper
//       })
//     }
//   }catch(e){
//     return res.status(500).send({
//       statusCode: res.statusCode,
//       message: 'Please check your server',
//       success: false,
//       data: e
//     })
//   }
// }

// exports.loginCustormerByPhone = async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ phone: req.body.phone })
//     if (user) {
//       const isEqual = await brcypt.compare(req.body.password, user.password)
//       if (isEqual) {
//         const token = jwt.sign({ userId: user.id, phone: user.phone }, 'zVZ6MohG0SAniGPEkEcPEfUQG', {expiresIn: '30d'})
//         const role = await Role.findOne({'role_name': 'customer'})
//         await UserModel.findByIdAndUpdate(user.id, {
//           loginning: role._id,
//           roles: [role._id]
//         }, {
//           new: true
//         })
//         const userLogin = await UserModel.findById(user.id).populate('roles').populate('loginning')
//         return res.status(200).send({
//           statusCode: res.statusCode,
//           message: 'Login success',
//           success: true,
//           data: {
//             ...userLogin._doc,
//             token: token
//           }
//         })
//       }
//     }
//     return res.status(400).send({
//       statusCode: res.statusCode,
//       message: 'Not found phone',
//       success: false,
//       data: null
//     })
//   } catch (e) {
//     return res.status(500).send({
//       statusCode: res.statusCode,
//       message: 'Please check your server',
//       success: false,
//       data: null
//     })
//   }
// }

// exports.loginInnkeeperByPhone = async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ phone: req.body.phone })
//     if (user) {
//       const isEqual = await brcypt.compare(req.body.password, user.password)
//       if (isEqual) {
//         const token = jwt.sign({ userId: user.id, phone: user.phone }, 'zVZ6MohG0SAniGPEkEcPEfUQG', {expiresIn: '30d'})
//         const role = await Role.findOne({'role_name': 'innkeeper'})
//         await UserModel.findByIdAndUpdate(user.id, {
//           loginning: role._id,
//           roles: [role._id]
//         }, {
//           new: true
//         })
//         const userLogin = await UserModel.findById(user.id).populate('roles').populate('loginning')
//         return res.status(200).send({
//           statusCode: res.statusCode,
//           message: 'Login success',
//           success: true,
//           data: {
//             ...userLogin._doc,
//             token: token
//           }
//         })
//       }
//     }
//     return res.status(400).send({
//       statusCode: res.statusCode,
//       message: 'Not found email',
//       success: false,
//       data: null
//     })
//   } catch (e) {
//     return res.status(500).send({
//       statusCode: res.statusCode,
//       message: 'Please check your server',
//       success: false,
//       data: null
//     })
//   }
// }
