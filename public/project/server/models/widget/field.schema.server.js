var mongoose = require("mongoose");

module.exports = function () {

    var ImageSchema = require("./image.schema.server.js")();
    var HeaderSchema= require("./header.schema.server.js")();
    var TextAreaSchema = require("./textarea.schema.server.js")();
    var LinkSchema= require("./link.schema.server.js")();
    var HtmlSchema= require("./html.schema.server.js")();
    var YouTubeSchema   = require("./youtube.schema.server.js")();


    var FieldSchema = mongoose.Schema({
        label:String,
        type: {type: String,
               enum: ['LABEL','HEADER','BUTTON','PARAGRAPH','TEXT','IMAGE','LINK',"HTML","YOUTUBE",
                       'LIST','TEXTAREA','OPTIONS','DATE','RADIOS','CHECKBOXES']},
        placeholder:String,
        options:[{label:String,value:String}],
        image   :   ImageSchema,
        header  :   HeaderSchema,
        textArea:   TextAreaSchema,
        html    :   HtmlSchema,
        link    :   LinkSchema,
        youTube :   YouTubeSchema
    });
    return FieldSchema;
};