module.exports = function(app,fieldModel) {
    app.get("/api/project/page/:pageId/field", findPageFields);
    app.get("/api/project/page/:pageId/field/:fieldId", findFieldsById);
    app.delete("/api/project/page/:pageId/field/:fieldId", deleteFieldById);
    app.post("/api/project/page/:pageId/field", createField);
    app.put("/api/project/page/:pageId/field/:fieldId", updateFieldById);
    app.put("/api/project/:pageId/field",sortField);


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

};