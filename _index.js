//express lib
var express = require('express');
//inspect
var util = require('util');
//instantiate express
var app = express();
//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 1337));
//use: for both POST and GET

var employees = [
    {"id":"1", "name":"John", "surname":"Doe", "level":"1", "salary":"2000"},
    {"id":"2", "name":"Johny", "surname":"Doe", "level":"1", "salary":"2000"},
    {"id":"3", "name":"JohnyB", "surname":"Doe", "level":"1", "salary":"2000"}
];

app.use('/FindEmployees', function(request, response) 
{
    //set the headers of the responce
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*"; //for cross enviroment request
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";//methods allowed to responce
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"; //type of headers
    //answer
    headers["Content-Type"] = "application/json";//format response
    response.writeHead(200, headers);
    
    var id = request.id;
    console.log("request.body: " + util.inspect(request.body) + "\n");
    console.log(request.body.id);
    //console.log(employees[parseInt(id)].name.toString());
    response.end("Cliccato Find");
});

app.use('/DeleteEmployees', function(request, response) 
{
    response.end("Cliccato Delete");
});

app.use('/AddEmployees', function(request, response) 
{
    response.end("Cliccato Add");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});