/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    router = require('./home')(router)
    router = require('./user')(router)
    router = require('./post')(router)
    router = require('./paper')(router)
    app.use('/api', router);
};
