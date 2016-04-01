var mongoose = require("mongoose");

module.exports = function () {
    var FieldSchema = mongoose.Schema({
        label:String,
        type: {"type": "string",
               "enum": ["TEXT", "EMAIL","TEXTAREA","OPTIONS","DATE","RADIOS","CHECKBOXES"]},
        placeholder:String,
        options:[{label:String,value:String}]
    });
    return FieldSchema;
};