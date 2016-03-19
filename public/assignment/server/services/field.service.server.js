module.exports = function(app,formModel,fieldModel) {
    app.get("/api/assignment/form/:formId/field", findFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldsById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);


    function findFormFields(req,res){
        var formId = req.params.formId;
        res.json(fieldModel.findFieldByFormId(formId));
    }

    function findFieldsById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(fieldModel.findField(formId,fieldId));
    }

    function deleteFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(fieldModel.deleteField(formId,fieldId));
    }

    function createField(req,res){
        var formId = req.params.formId;
        var field= req.body;
        res.json(fieldModel.createField(formId,field));
    }

    function updateFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = req.body;
        res.json(fieldModel.updateField(formId,fieldId,form));
    }
};