module.exports = function(app,fieldModel) {
    app.get("/api/assignment/form/:formId/field", findFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldsById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);


    function findFormFields(req,res){
        var formId = req.params.formId;
        fieldModel.findAllFieldsForForm(formId)
            .then(function(fields){
                res.json(fields);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function findFieldsById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findField(formId,fieldId)
            .then(function(fields){
                res.json(fields);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function deleteFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteField(formId,fieldId)
            .then(function(stats){
                res.send(200);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function createField(req,res){
        console.log("create - server");
        var formId = req.params.formId;
        var field= req.body;
        fieldModel.createField(formId,field)
            .then(function(doc){
                res.json(doc);
                },
            function(err){
                res.status(400).send(err);
            });
    }


    function updateFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = req.body;
        fieldModel.updateField(formId,fieldId,form)
            .then(function(field){
                res.json(field);
            },function(err){
                res.status(400).send(err);
            });
    }

};