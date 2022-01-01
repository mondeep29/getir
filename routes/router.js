module.exports = function (router){
    require('./api')(router);
    return router;
}