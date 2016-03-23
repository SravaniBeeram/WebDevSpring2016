var mock = require("./user.mock.json");

module.exports = function (uuid) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findById: findById,
        updateUser: updateUser,
        deleteUserById:deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function createUser(user) {
        var user = {
            username: user.username,
            password: user.password,
            _id: uuid.v1(),
            email:user.email
        };
        mock.push(user);
        return (user);
    }

    function findAllUsers() {
        return (mock);
    }

    function findById(userid) {
        for (var u in mock) {
            if (mock[u]._id == userid) {
                return mock[u];
            }
            else {
                return null;
            }
        }
    }

    function findUserByUsername(username) {
        for (var u in mock) {
            if (mock[u].username == username) {
                return mock[u];
            }
            else {
                return null;
            }
        }
    }

    function updateUser(userId, user) {
        for (var u in mock) {
            if (mock[u]._id == userId) {
                flag = "true";
                mock[u] = user;
                return (mock[u]);
            }
        }
        return (null);
    }

    function deleteUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock.splice(u, 1);
            }
        }
        return (mock);
    }


    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
};