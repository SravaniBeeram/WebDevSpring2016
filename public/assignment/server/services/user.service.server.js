module.exports = function(app,userModel){
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user",allUsers);
    app.get("/api/assignment/user/:userId",findById);
    app.get("/api/assignment/user/:username",findUserByUsername);
    app.get("/api/assignment/user/:username/:password",findUserByCredentials);
    app.put("/api/assignment/user/:userId",updateUser);
    app.delete("/api/assignment/user/:userId",deleteUserById);


    function createUser(req,res){
        var user=req.body;
        res.json(userModel.createUser(user));
    }

    function allUsers(req,res){
        res.json(userModel.findAllUsers());
    }

    function findById(req,res){
        var userId =req.params.userId;
        res.json(userModel.findById(userId));
    }

    function findUserByUsername(req,res){
        var username = req.params.username;
        res.json(userModel.findUserByUsername(username));
    }

    function findUserByCredentials(req,res){
        var credentials = {
            username:req.params.username,
            password:req.params.password
        };
        res.json(userModel.findUserByCredentials(credentials));
    }

    function updateUser(req,res){
        var userId =req.params.userId;
        var user = req.body;
        res.json(userModel.updateUser(userId,user));
    }

    function deleteUserById(req,res){
        var userId =req.params.userId;
        res.json(userModel.deleteUserById(userId));
    }

};