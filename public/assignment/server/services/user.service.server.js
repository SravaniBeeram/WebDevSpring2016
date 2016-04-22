var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app,userModel){

    var auth = authorized;
    app.post('/api/assignment/login', passport.authenticate('assignment'), login);
    app.post('/api/assignment/logout',logout);
    app.get('/api/assignment/loggedin',loggedin);
    app.post('/api/assignment/register',register);
    app.post("/api/assignment/admin/user",auth,createUser);
    app.get("/api/assignment/admin/user",auth,allUsers);
    app.get("/api/assignment/admin/user/:userId",findById);
    app.put("/api/assignment/admin/user/:userId",auth,updateUser);
    app.delete("/api/assignment/admin/user/:userId",auth,deleteUserById);

    passport.use('assignment',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password,user.password))
                    {
                        return done(null, user);
                    }else{
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }

            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req,res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function createUser(req,res){
        var newUser=req.body;

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ['student'];
        }

            userModel
                .findUserByUsername(newUser.username)
                .then(function (user) {
                        if (user) {
                            res.json(null);
                        } else {
                            newUser.password = bcrypt.hashSync(newUser.password);
                            return userModel.createUser(newUser);
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (user) {
                        if (user) {
                            res.json(user);
                        }else{
                            res.json(null);
                        }},
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }

    function allUsers(req,res){
        if(isAdmin(req.user)){
            userModel.findAllUsers()
                .then(function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        }else{
            res.status(403);
        }
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
                res.json(user);
            },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function register(req, res) {
        var newUser = req.body;
        if (newUser.username == "admin") {
            newUser.roles = ['admin'];
        }
        else {
            newUser.roles = ['student'];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function updateUser(req,res){
        var userId =req.params.userId;
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel.updateUser(userId,newUser)
            .then(function (user) {
                res.json(user);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function deleteUserById(req,res){
        if(isAdmin(req.user)){
            var userId =req.params.userId;
            userModel.deleteUserById(userId)
                .then(function(stats){
                        res.send(200);
                    },
                    function(err){
                        res.status(400).send(err);
                    })
                .then(function(users){
                res.json(users);
                }, function (err) {
                    res.status.send(err);
                });
        }

    }

};