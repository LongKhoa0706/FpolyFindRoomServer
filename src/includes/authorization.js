const UserModel = require('../models/user');

class Authorization {
    constructor () {
        this.userId = 0;
    }

    async authorize(req,  cap ) {
        try {
            var users = null;
            if (req.body.socialType == 'facebook') {
                users = await UserModel.findOne({$and: [{socialType: req.body.socialType}, {idFacebook: req.body.idSocial}]}).populate("roles");
            } else {
                users = await UserModel.findOne({$and: [{socialType: req.body.socialType}, {idGoogle: req.body.idSocial}]}).populate("roles");
            }
            // const user = await UserModel.findById("5f95374d48c85106e1170b3a").populate("roles");
            for ( let role of users.roles ) {
                if ( role.capabilities.indexOf(cap) !== -1 ) {
                    return true;
                }
            }
        }
        catch(e) {
            return false;
        }

        return false;
    }
}

module.exports =  new Authorization();