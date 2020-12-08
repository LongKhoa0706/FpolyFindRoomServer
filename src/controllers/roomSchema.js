const RoomModel = require('../models/roomModel')
// 
const Validation = require('../includes/validation')
// 
const messageVI = require('../includes/message_vi')

exports.addRoom = async (req,res,next) => {
  try {
    let code = await Validation.canDoAction(
      req,
      'addRoom'
    )
    if (code === messageVI.mesagesCode.ok.code) {
      const room = await new RoomModel({
        ...req.body,
        author: Validation.userId
      }).save()
      const rommCreated = await RoomModel.findById(room._id).populate('author')
      return res.status(messageVI.mesagesCode.addroom_success.code).send({
        statusCode: res.statusCode,
        success:true,
        message: messageVI.mesagesCode.addroom_success.message,
        data: rommCreated
      })
    } else {
      return res.status(messageVI.mesagesCode.unauthenticate.code).send({
        statusCode: res.statusCode,
        success:false,
        message: messageVI.mesagesCode.unauthenticate.message,
        data: []
      })
    }
  } catch (e) {
    return res.status(messageVI.mesagesCode.server_error.code).send({
      statusCode: res.statusCode,
      success:false,
      message: messageVI.mesagesCode.server_error.message,
      data: []
    })
  }
}

exports.updateRoom = async (req,res,next) => {
  try {
    let code = await Validation.canDoAction(
      req,
      'updateRoom'
    )
    if (code === messageVI.mesagesCode.ok.code) {
      const roomValid = await RoomModel.findById(req.params.id)
      if (!roomValid) {
        return res.status(messageVI.mesagesCode.not_found.code).send({
          statusCode: res.statusCode,
          success:false,
          message: messageVI.mesagesCode.not_found.message,
          data: []
        })
      } else {
        if (roomValid.author != Validation.userId) {
          return res.status(messageVI.mesagesCode.unauthenticate.code).send({
            statusCode: res.statusCode,
            success:false,
            message: messageVI.mesagesCode.unauthenticate.message,
            data: []
          })
        } else {
          const room = await RoomModel.findByIdAndUpdate(roomValid._id, {
            ...req.body
          }, {
            new: true
          })
          const rommUpdated = await RoomModel.findById(room._id).populate('author')
          return res.status(messageVI.mesagesCode.addroom_success.code).send({
            statusCode: res.statusCode,
            success:true,
            message: messageVI.mesagesCode.updateroom_success.message,
            data: rommUpdated
          })
        }
      }
    } else {
      return res.status(messageVI.mesagesCode.unauthenticate.code).send({
        statusCode: res.statusCode,
        success:false,
        message: messageVI.mesagesCode.unauthenticate.message,
        data: []
      })
    }
  } catch (e) {
    return res.status(messageVI.mesagesCode.server_error.code).send({
      statusCode: res.statusCode,
      success:false,
      message: messageVI.mesagesCode.server_error.message,
      data: []
    })
  }
}

exports.rooms = async (req, res, next) => {
  try {
    let code = await Validation.canDoAction(
      req,
      'rooms'
    )
    if (code === 200) {
      const rooms = await RoomModel.find({deleted_at: null }).populate('author')
      return res.status(200).send({
        statusCode: res.statusCode,
        success:true,
        message: messageVI.mesagesCode.get_room_success.message,
        data: rooms
      })
    } else {
      return res.status(401).send({
        statusCode: res.statusCode,
        success: false,
        message: messageVI.mesagesCode.unauthenticate.message,
        data: []
      })
    }
  } catch (e) {
    return res.status(500).send({
      statusCode: res.statusCode,
      success: false,
      message: messageVI.mesagesCode.server_error.message,
      data: []
    })
  }
}
