module.exports = function(app,db){
    var userModel = require("./models/user.model.js")(app,db);
    var pageModel = require("./models/pages.model.js")(app,db);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var pageService = require("./services/pages.service.server.js")(app,pageModel,userModel);

};