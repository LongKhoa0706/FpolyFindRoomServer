const express = require('express');
const router = express.Router()

const categoriesQuanController = require('../controllers/categoriesDistrictController')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())
router.post('/create-categoriesRoom',categoriesQuanController.addCategoriesDistrict)
router.get('/getAllDistrict',categoriesQuanController.listGetAllDistrict)
router.get('/findRoomByCategories/:id',categoriesQuanController.listFindRoomByCategoriesDistrict)
module.exports = router