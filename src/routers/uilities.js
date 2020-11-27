const express = require('express');
const router = express.Router()

const utilControllers = require('../controllers/utilsController')

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.post('/create-util',utilControllers.addUtil)
router.get('/getAllUtil',utilControllers.listGetAllUtils)

module.exports = router