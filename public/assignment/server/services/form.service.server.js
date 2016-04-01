module.exports = function(app,formModel){

    app.get("/api/assignment/form/:formId",findFormById);
    app.delete("/api/assignment/form/:formId",deleteFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.put("/api/assignment/form/:formId",updateFormById);
    app.get("/api/assignment/userForms/:userId/form",findFormsByUserId);

    function findFormsByUserId(req,res){
        var userId = req.params.userId;
        formModel.findFormsByUserId(userId)
            .then(function(forms){
                res.json(forms);
            }, function(err) {
                res.status(400).send(err);
            });
    }

    function findFormById(req,res){
        var fid = req.params.formId;
        formModel.findFormById(fid)
            .then(function(form){
                res.json(form);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function deleteFormById(req,res){
        var fid = req.params.formId;
        formModel.deleteFormById(fid)
            .then(function(stats){
                res.send(200);
            },function(err){
                res.status(400).send(err);
            });
    }

    function createFormForUser(req,res){
        var userId = req.params.userId;
        var newForm = req.body;
        formModel.createForm(userId,newForm)
            .then(function(form){
                res.json(form);
            },function(err){
                res.status(400).send(err);
            });
    }

    function updateFormById(req,res){
        var formId = req.params.formId;
        var newForm = req.body;
        formModel.updateFormById(formId,newForm)
            .then(function(doc){
                res.json(doc);
            },function(err){
                res.status(400).send(err);
            });
    }
};