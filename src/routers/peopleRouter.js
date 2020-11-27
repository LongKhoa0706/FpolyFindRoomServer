const express = require('express');
const router  = express.Router();

const userSchema = require('../controllers/userSchema');

// import & setting bodyParser
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
