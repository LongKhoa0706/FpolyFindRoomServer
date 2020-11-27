const express = require('express');
const router = express.Router()

const roleController = require('../controllers/roleController')

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.post('/create-role',roleController.addRole)
module.exports = router