var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.get('/hello', function(req, res){
    res.send('hello world 123');
});

app.get('/user',getAllUsers);

function getAllUsers(req,res){
    var users =[
    {username: "alice", firstName:"Alice", lastName:"wonderland"},
    {username: "bob",firstName:"Bob", lastName:"Builder"},
        {username: "harry",firstName:"Harry", lastName:"Potter"},
        {username: "ron", firstName: "Ronald ", lastName:"weasley"}
    ];
    res.json(users);
}
app.listen(port, ipaddress);
