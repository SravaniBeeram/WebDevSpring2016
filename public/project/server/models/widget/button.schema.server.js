var mongoose = require("mongoose");

module.exports = function () {

    var ButtonSchema = mongoose.Schema({
        link : String,
        style: String
    });

    return ButtonSchema;
};