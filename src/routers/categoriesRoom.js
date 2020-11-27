const express = require('express');
const router = express.Router()

const categoriesRoomContronller = require('../controllers/categoriesDistrictController')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.post('/create-categoriesRoom',categoriesRoomContronller.addCategoriesDistrict)
module.exports = router