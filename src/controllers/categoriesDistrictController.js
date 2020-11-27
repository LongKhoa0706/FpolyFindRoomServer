const categoryDistrictService = require('../service/categoriesDistrict')
const CategoriesDisttrict = require('../models/categoriesQuan')
// controller là trung gian cầu nối giữa model,
//


exports.addCategoriesDistrict = async function (req,res) {
    const categoryDistrict = CategoriesDisttrict(req.body)
    categoryDistrict.name = req.body.name
    categoryDistrict.images = req.body.images

    categoryDistrictService.createCategoriesQuan(categoryDistrict,function (err,response) {
        if (response) {
            res.status(200).send({statusCode: res.statusCode, data: response});
        } else if (error) {
            res.status(400).send({statusCode: res.statusCode, err: 'Thêm thất bại! ' + err});
        }
    })
}
exports.listGetAllDistrict = async (req,res) => {
    categoryDistrictService.getAllDistrict(function (err,response) {
        if (response) {
            res.status(200).send({statusCode: res.statusCode,messages:'Lấy danh sách quận thành ', data: response});
        } else if (error) {
            res.status(400).send({statusCode: res.statusCode, err: 'Lấy danh sách quận thất bại! ' + err});
        }
    })
}


exports.listFindRoomByCategoriesDistrict = async (req,res) => {
    categoryDistrictService.findRoomByCategoriesQuan(req.params.id,function (err,response) {
        if (response) {
            res.status(200).send({statusCode: res.statusCode,success: true,message:"Lấy danh sách thành công", data: response});
        } else if (error) {
            res.status(400).send({statusCode: res.statusCode,message:"Lấy danh sách thất bại",success: false, err: 'Thêm thất bại! ' + err});
        }
    })
}