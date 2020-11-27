const categoriesRoom = require('../models/categoriesRoom')

exports.createCategoriesRoom = async (req, res) => {
    const categoriesRoomm = new categoriesRoom({
        name: req.body.name,
    })
    categoriesRoomm.save(categoriesRoom).then((data) =>{
        res.status(200).send({
            code: 200,
            status: true,
            message:'Tạo thành công',
            data:data
        })
    })
}
