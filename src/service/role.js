const rolecc = require('../models/role')
const mongoose = require('mongoose')

exports.createRole = function (role, callback) {
    role.save(role).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};