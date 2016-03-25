module.exports = function(app,uuid){
    var userModel = require("./models/user.model.js")(uuid);
    var pageModel = require("./models/pages.model.js")(uuid);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var pageService = require("./services/pages.service.server.js")(app,pageModel);
};