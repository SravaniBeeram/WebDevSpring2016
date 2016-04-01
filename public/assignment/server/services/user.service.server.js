module.exports = function(app,userModel){

    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user",allUsers);
    app.get("/api/assignment/user/:userId",findById);
    app.get("/api/assignment/username/:username",findUserByUsername);
    app.get("/api/assignment/user/:username/:password",findUserByCredentials);
    app.put("/api/assignment/user/:userId",updateUser);
    app.delete("/api/assignment/user/:userId",deleteUserById);

    function createUser(req,res){
        var newUser=req.body;
        newUser.roles = "student";
        userModel.createUser(newUser)
            .then(function (user) {
                res.json(user)
            },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function allUsers(req,res){
        userModel.findAllUsers()
            .then(function(users) {
                res.json(users);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function findById(req,res){
        var userId =req.params.userId;
        userModel.findById(userId)
            .then(function(user){
                res.json(err);
            },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByUsername(req,res){
        var username = req.params.username;
        userModel.findUserByUsername(username)
            .then(function(user) {
                console.log("server" +user);
                delete user.password;
                res.json(user);
            },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req,res){
        var username = req.params.username;
        var password = req.params.password;

        var credentials = {
            "username":username,
            "password":password};

        userModel.findUserByCredentials(credentials)
            .then(function(user){
                res.json(user);
            },
            function(err){
                res.status(400).send(err);
            });

    }

    function updateUser(req,res){
        var userId =req.params.userId;
        var newUser = req.body;
        if(newUser.roles != null){
            newUser.roles = newUser.roles.split(",");
        }
        userModel.updateUser(userId,newUser)
            .then(function (stats) {
                res.send(200);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function deleteUserById(req,res){
        var userId =req.params.userId;
        userModel.deleteUserById(userId)
            .then(function(stats){
                res.send(200);
            },
            function(err){
                res.status(400).send(err);
            });
    }

};