module.exports = function(app,uuid,db){
    var userModel = require("./models/user.model.js")(app,uuid,db);
    var formModel = require("./models/form.model.js")(app,uuid,db);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var formService = require("./services/form.service.server.js")(app,formModel,userModel);
};