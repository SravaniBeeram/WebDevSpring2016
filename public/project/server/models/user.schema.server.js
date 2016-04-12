var mongoose = require("mongoose");

module.exports = function () {
    var ProjUserSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        role:String,
        emails:[String],
        phones:[String]
    },{collection:'ProjUser'});
    return ProjUserSchema;
};