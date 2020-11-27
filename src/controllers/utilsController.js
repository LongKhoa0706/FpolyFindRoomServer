const Util = require('../models/uilities')
const utilsService = require('../service/managerUilities')
exports.addUtil = async function (res,req) {
    const utils = new Util(req.body)
    utils.name = req.body.name
    utils.images = req.body.images

    utilsService.createUtil(utils,function (err,response) {
        if (response){
            res.status(200).send({statusCode: res.statusCode,success: true, data: response})
        }else {
            res.status(400).send({statusCode: res.statusCode,success: false, data: err})
        }
    })
}

exports.listGetAllUtils = async function (req,res) {
    utilsService.getAllUtil(function (err,response) {
        if (response) {
            console.log(response)
            res.status(200).send({statusCode: res.statusCode,success: true, data: response});
        } else if (err) {
            res.status(400).send({statusCode: res.statusCode,success: false, data:  err});
        }
    })
}