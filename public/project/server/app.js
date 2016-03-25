module.exports = function(app,uuid){
    var userModel = require("./models/user.model.js")(uuid);
    var pageModel = require("./models/pages.model.js")(uuid);
    var fieldModel = require("./models/fields.model.js")(uuid,pageModel);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var formService = require("./services/pages.service.server.js")(app,pageModel);
    var fieldService = require("./services/fields.service.server.js")(app,pageModel,fieldModel);

};