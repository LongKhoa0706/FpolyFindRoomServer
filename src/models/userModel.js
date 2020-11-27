const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    roles : [{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Role"
    }],
    email: {
        type: String
    },
    verify:{
        type: Boolean,
        default: false, 
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: Date.now,
    },
    loginning: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    }
})

const user = mongoose.model('People', UserSchema);
module.exports = user;