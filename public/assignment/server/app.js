module.exports = function(app,db){
    var userModel = require("./models/user.model.js")(app,db);
    var formModel = require("./models/form.model.js")(app,db);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var formService = require("./services/form.service.server.js")(app,formModel,userModel);
};