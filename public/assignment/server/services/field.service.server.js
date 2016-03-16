module.exports = function(app,userModel,formModel) {
    app.post("/api/assignment/form/:formId/field", findFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldsById);
    app.delete("/api/assignment/form:formId/field/:fieldId", deleteFieldsById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);


    function findFormFields(req,res){
        var formId = req.formId;
        res.json(findFormFields(formId));
    }

    function findFieldsById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(findFieldsById(formId,fieldId));
    }

    function deleteFieldsById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(deleteFieldsById(formId,fieldId));
    }

    function createField(req,res){
        var formId = req.params.formId;
        var field= req.body;
        res.json(createField(formId,field));
    }

    function updateFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = req.body;
        res.json(updateFieldById(formId,fieldId,form));
    }
};