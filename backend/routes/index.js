const mainRouter = require('./main');

module.exports = function (app) {
    mainRouter(app);
}