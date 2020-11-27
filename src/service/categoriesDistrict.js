const categoriesQuan = require('../models/categoriesQuan')
const room = require('../models/room')

// tầng này là xử lý logic
exports.createCategoriesQuan = async function (categoriesDistrict, callback)  {
    categoriesDistrict.save(categoriesDistrict).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });}

    // lấy tất cả quận
exports.getAllDistrict = async function (callback) {
    categoriesQuan.find({},(err,response) => {
        callback(err,response)
    })

}

// tìm phòng theo quận
exports.findRoomByCategoriesQuan = async function (idCategoriesQuan,callback)  {
    room.find({categoriesQuan: idCategoriesQuan}, (err,result) =>  {
        callback(err,result)
    }).populate({
        path:'util'
    }).populate({
        path:'categoriesRoom'
    }).populate({
        path:'categoriesQuan'
    }).populate({
        path:'iduser'
    })
}
