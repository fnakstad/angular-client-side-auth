var _ =           require('underscore')
    , User =      require('../models/User.js')
    , userRoles = require('../../client/js/routingConfig').userRoles;

module.exports = {
    index: function(req, res) {
        if(!req.user)                         return res.send(403);
        if(req.user.role !== userRoles.admin) return res.send(403);

        var users = User.findAll();
        _.each(users, function(user) { delete user.password; });
        res.json(users);
    }
};