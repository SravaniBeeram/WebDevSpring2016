module.exports = function(app,fieldModel,pageModel) {


    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/project/page/:pageId/field", findPageFields);
    app.get("/api/project/page/:pageId/field/:fieldId", findFieldsById);
    app.delete("/api/project/page/:pageId/field/:fieldId", deleteFieldById);
    app.post("/api/project/page/:pageId/field", createField);
    app.put("/api/project/page/:pageId/field/:fieldId", updateFieldById);
    app.put("/api/project/:pageId/field",sortField);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);



    function findPageFields(req,res){
        var pageId = req.params.pageId;
        fieldModel.findPageFields(pageId)
            .then(function(fields){
                res.json(fields);
            },function(err){
                res.status(400).send(200);
            });
    }

    function findFieldsById(req,res){
        var pageId = req.params.pageId;
        var fieldId = req.params.fieldId;
        fieldModel.findField(pageId,fieldId)
            .then(function(fields){
                res.json(fields);
            },function(err){
                res.status(400).send(err);
            });
    }

    function deleteFieldById(req,res){
        var pageId = req.params.pageId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteField(pageId,fieldId)
            .then(function(stats){
                res.send(200);
            },function(err){
                res.status(400).send(err);
            });
    }

    function createField(req,res){
        var pageId = req.params.pageId;
        var field= req.body;
        fieldModel.createField(pageId,field)
            .then(function(field){
                res.json(field);
            },function(err){
                res.status(400).send(err);
            });
    }

    function updateFieldById(req,res){
        var pageId = req.params.pageId;
        var fieldId = req.params.fieldId;
        var page = req.body;
        fieldModel.updateField(pageId,fieldId,page)
            .then(function(field){
                res.json(field);
            },function(err){
                res.status(400).send(err);
            });
    }

    function sortField(req,res){
        var pageId = req.params.pageId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;
        if(startIndex && endIndex){
            fieldModel.sortField(pageId,startIndex,endIndex)
                .then(function(stat){
                    return fieldModel.findPageFields(pageId);
                },function(err){
                    res.status(400).send(err);
                }).then(function(doc){
                res.json(doc);
            },function(err){
                res.status(400).send(err);
            });
        }
    }


    function uploadImage(req, res) {

        var username      = req.user.username;
        var pageId        = req.body.pageId;
        var fieldId      = req.body.fieldId;
        var width         = req.body.width;
        var myFile        = req.file;

        var destination   = myFile.destination;
        var path          = myFile.path;
        var originalname  = myFile.originalname;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var filename      = myFile.filename;

        pageModel.getMongooseModel()
            .findById(pageId)
            .then(
                function(page) {
                    var widget = page._id(pageId).field._id(fieldId);
                    widget.image.url = "/uploads/"+filename;//originalname;
                    widget.image.width = width;
                    return application.save();
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(){
                    res.redirect("/#/user/"+currentUser.username+"/page/"+pageId+"/field");
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }


};