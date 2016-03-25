module.exports = function(app,pageModel,fieldModel) {
    app.get("/api/project/page/:pageId/field", findPageFields);
    app.get("/api/project/page/:pageId/field/:fieldId", findFieldsById);
    app.delete("/api/project/page/:pageId/field/:fieldId", deleteFieldById);
    app.post("/api/project/page/:pageId/field", createField);
    app.put("/api/project/page/:pageId/field/:fieldId", updateFieldById);


    function findPageFields(req,res){
        var pageId = req.params.pageId;
        res.json(fieldModel.findFieldByPageId(pageId));
    }

    function findFieldsById(req,res){
        var pageId = req.params.pageId;
        var fieldId = req.params.fieldId;
        res.json(fieldModel.findField(pageId,fieldId));
    }

    function deleteFieldById(req,res){
        var pageId = req.params.pageId;
        var fieldId = req.params.fieldId;
        res.json(fieldModel.deleteField(pageId,fieldId));
    }

    function createField(req,res){
        var pageId = req.params.pageId;
        var field= req.body;
        res.json(fieldModel.createField(pageId,field));
    }

    function updateFieldById(req,res){
        var pageId = req.params.pageId;
        var fieldId = req.params.fieldId;
        var page = req.body;
        res.json(fieldModel.updateField(pageId,fieldId,page));
    }
};