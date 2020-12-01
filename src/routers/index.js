const express = require('express');
const router = express.Router()

// Import Schema
const roleSchema = require('../controllers/roleSchema')
const userSchema = require('../controllers/userSchema')

// Boy Parser
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

// Route setup route
router.post('/create-role', roleSchema.addRole)
router.post('/add-capabilities', roleSchema.addCapabilities)
// User setup route
router.post('/register', userSchema.register)
router.post('/login', userSchema.login)
router.post('/update-profile', userSchema.updateProfile)
router.post('/check-phone', userSchema.checkPhone)
router.post('/profile', userSchema.profile)
router.post('/update-role-user', userSchema.updateRole)

// Exports
module.exports = router

/*
const express = require('express');
const router  = express.Router();

const userSchema = require('../controllers/userSchema');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/register', userSchema.register)
router.post('/check-phone', userSchema.checkPhone)
router.post('/login', userSchema.login)
router.get('/profile', userSchema.profile)
router.get('/listInnkeeper',userSchema.getListInnkeeper)
router.post('/update-profile', userSchema.updateProfile)
router.post('/login-custormer-by-phone', userSchema.loginCustormerByPhone)
router.post('/login-innkeeper-by-phone', userSchema.loginInnkeeperByPhone)
module.exports = router
*/
