const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');
// ----------------------------
const People = require('../models/userModel')
const Role = require('../models/role')


exports.checkPhone = async (req, res) => {
  try {
    if (req.body.phone != undefined && req.body.phone != null && req.body.phone != '') {
      const phone = await People.findOne({'phone': req.body.phone});
      if (phone) {
        return res.status(400).send({
          statusCode: res.statusCode,
          message: 'Số điện thoại này chưa được  đăng ký ', 
          success: false, 
          data: phone
        });
      } else {
        return res.status(200).send({
          statusCode: res.statusCode,
          message: 'Tài khoản này đã được đăng ký ', 
          success: true, 
          data: true
        });
      }
    } else {
      return res.status(400).send({
        statusCode: res.statusCode, 
        message: 'Vui lòng nhập số điện thoại ', 
        success: false, 
        data: null
      });
    }
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false, data: null
    });
  }
}

exports.getListInnkeeper = async (req,res) => {
  try{
    const innkeeper = await People.findOne(roles)
    if(innkeeper){
      return res.status(200).send({
        statusCode: res.statusCode,
        message: 'Lấy danh sách thành công',
        success: true,
        data: innkeeper
      });
    }
  }catch(e){
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: e
    });
  }
}

exports.register = async (req, res) => {
  try {
    if (req.body.phone != undefined && req.body.phone != null && req.body.phone != '') {
      const phone = await People.findOne({'phone': req.body.phone});
      if (phone) {
        return res.status(400).send({
          statusCode: res.statusCode,
          message: 'Phone number already in use', 
          success: false, 
          data: null
        });
      } else {
        req.body.password = await brcypt.hashSync(req.body.password);
        const user = await new People(req.body).save();
        const dataUser = await People.findById(user._id).populate('roles','role_name');
        return res.status(200).send({
          statusCode: res.statusCode,
          success: true, 
          data: dataUser
        });
      }
    } else {
      return res.status(400).send({
        statusCode: res.statusCode, 
        message: 'Please enter the phone number', 
        success: false, 
        data: null
      });
    }
  } catch (err) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    });
  }
}

exports.login = async (req, res) => {
  try {
    const user = await People.findOne({ phone: req.body.phone });
    if (user) {
      const isEqual = await brcypt.compare(req.body.password, user.password);
      if (isEqual) {
        // 1EZbdREcRFdRHozPNXpn9KGD => Tìm cái secect key khác gắn vô, vài bữa tui đổi là lỗi ă
        const token = jwt.sign({ userId: user.id, phone: user.phone }, 'zVZ6MohG0SAniGPEkEcPEfUQG', {expiresIn: '30d'});
        return res.status(200).send({
          statusCode: res.statusCode,
          message: 'Login success',
          success: true,
          data: {
            ...user._doc,
            token: token
          }
        });
      }
    }
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Số điện thoại chưa được đăng ký ',
      success: false,
      data: null
    });
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    });
  }
}

exports.profile = async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.headers.authorization, 'zVZ6MohG0SAniGPEkEcPEfUQG');
    if (decodedToken) {
      const user = await People.findById(decodedToken.userId).populate('roles');
      return res.status(200).send({
        statusCode: res.statusCode,
        message: 'Profilel success',
        success: true,
        data: user
      });
    } else {
      return res.status(401).send({
        statusCode: res.statusCode,
        message: 'Please log in',
        success: false,
        data: null
      });
    }
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    });
  }
}
exports.loginCustormerByPhone = async (req, res) => {
  try {
    const user = await People.findOne({ phone: req.body.phone });
    if (user) {
      const isEqual = await brcypt.compare(req.body.password, user.password);
      if (isEqual) {
        const token = jwt.sign({ userId: user.id, phone: user.phone }, 'zVZ6MohG0SAniGPEkEcPEfUQG', {expiresIn: '30d'});
        const role = await Role.findOne({'role_name': 'customer'});
        await People.findByIdAndUpdate(user.id, {
          loginning: role._id,
          roles: [role._id]
        }, {
          new: true
        });
        const userLogin = await People.findById(user.id).populate('roles').populate('loginning');
        return res.status(200).send({
          statusCode: res.statusCode,
          message: 'Login success',
          success: true,
          data: {
            ...userLogin._doc,
            token: token
          }
        });
      }
    }
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Not found phone',
      success: false,
      data: null
    });
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    });
  }
}

exports.loginInnkeeperByPhone = async (req, res) => {
  try {
    const user = await People.findOne({ phone: req.body.phone });
    if (user) {
      const isEqual = await brcypt.compare(req.body.password, user.password);
      if (isEqual) {
        const token = jwt.sign({ userId: user.id, phone: user.phone }, 'zVZ6MohG0SAniGPEkEcPEfUQG', {expiresIn: '30d'});
        const role = await Role.findOne({'role_name': 'innkeeper'});
        await People.findByIdAndUpdate(user.id, {
          loginning: role._id,
          roles: [role._id]
        }, {
          new: true
        });
        const userLogin = await People.findById(user.id).populate('roles').populate('loginning');
        return res.status(200).send({
          statusCode: res.statusCode,
          message: 'Login success',
          success: true,
          data: {
            ...userLogin._doc,
            token: token
          }
        });
      }
    }
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Not found email',
      success: false,
      data: null
    });
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    });
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.headers.authorization, 'zVZ6MohG0SAniGPEkEcPEfUQG');
    if (decodedToken) {
      const user = await People.findByIdAndUpdate(decodedToken.userId, {
        ...req.body
      }, {
        new: true
      });
      return res.status(200).send({
        statusCode: res.statusCode,
        message: 'Update success',
        success: true,
        data: user
      });
    } else {
      return res.status(401).send({
        statusCode: res.statusCode,
        message: 'Please log in',
        success: false,
        data: null
      });
    }
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      message: 'Please check your server',
      success: false,
      data: null
    });
  }
}
