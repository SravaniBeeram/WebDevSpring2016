module.exports = function(app,userModel,formModel) {
    app.post("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);


    function findAllFormsForUser(req,res){
        var userId = req.userId;
        res.json(findAllFormsForUser(userId));
    }

    function findFormById(req,res){
        var formId = req.params.formId;
        res.json(findFormById(formId));
    }

    function deleteFormById(req,res){
        var formId = req.params.formId;
        res.json(deleteFormById(formId));
    }

    function createFormForUser(req,res){
        var userId = req.params.userId;
        var form = req.body;
        res.json(createFormForUser(userId,form));
    }

    function updateFormById(req,res){
        var formId = req.params.formId;
        var form = req.body;
        res.json(updateFormById(formId,form));
    }
};