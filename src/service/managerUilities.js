const Ultil = require('../models/uilities');

exports.createUtil = async function (utils,callback) {
    utils.save(utils).then((response) => {
        callback(null,response)
    }),(error) => {
        callback(null,error)
    }
}
exports.getAllUtil = async function (callback) {
    Ultil.find({},function (error,response) {
        callback(error,response)
    })
}

