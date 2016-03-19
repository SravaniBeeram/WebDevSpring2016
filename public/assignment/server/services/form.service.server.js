module.exports = function(app,formModel,userModel) {

    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/user/:userId/form",findFormsByUserId);

    function findFormsByUserId(req, res) {
        console.log("server");
        var userId = req.params.userId;
        console.log(userId);
        res.json(formModel.findFormsByUserId(userId));
    }

    function findFormById(req,res){
        var fid = req.params.formId;
        res.json(formModel.findFormById(fid));
    }

    function deleteFormById(req,res){
        var fid = req.params.formId;
        res.json(formModel.deleteFormById(fid));
    }

    function createFormForUser(req,res){
        var userId = req.params.userId;
        var form = req.body;
        res.json(formModel.createForm(userId,form));
    }

    function updateFormById(req,res){
        var formId = req.params.formId;
        var form = req.body;
        res.json(formModel.updateFormById(formId,form));
    }
};