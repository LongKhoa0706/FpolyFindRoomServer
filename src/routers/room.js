const express = require('express');
const router = express.Router()

const roomController = require('../controllers/roomController')

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.post('/create-room',roomController.addRoom)
router.get('/getDetailRoom/:id',roomController.listDetailRoom)
router.post('/getAllRoom',roomController.listGetAllRoom)
router.post('/getRoomForUser/:id',roomController.listGetRoomForUser)
router.post('/delete-room/:id',roomController.deleteRoom)
module.exports = router