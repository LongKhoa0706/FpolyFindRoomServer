const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Roles = Object.freeze({
    Admin: 'admin',
    User: 'user',
    LandLord: 'landlord',
});

const userr = new Schema({
    roles : [{
        type: Schema.Types.ObjectId,OS
        require: true,
        ref: "Role"
    }],
    name : {
       type :String,
    },
    email: {
        type: String,

    },
    avatar: {
        type: String,
    },
    phone: {
        type: String,
    },
    // uid: {
    //     type: String,
    // },
    // Id Social
    idFacebook: {
        type: String,
    },
    idGoogle: {
        type: String,
    },
    socialType: {
        type: String,
    },
    verifi: {
        default: false,
        type: Boolean,
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: Date.now,
    }
})
Object.assign(userr.statics, {
    roles: Roles,
});

const user = mongoose.model('user', userr);
module.exports = user;