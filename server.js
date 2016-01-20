var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.get('/hello', function(req, res){
    res.send('hello world 123');
});


app.get('/user',function(req,res){
    var users;
    users = [
        {username: 'alice', first: 'Alice', last: 'wonderland'},
        {username: 'bob', first: 'Bob', last: 'Builder'},
        {username: 'sravani', first: 'Sravani', last: 'Beeram'}
    ];
    res.json(users);
});
app.listen(port, ipaddress);
