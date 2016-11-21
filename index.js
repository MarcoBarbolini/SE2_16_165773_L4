//express lib
var express = require('express');
//inspect
var util = require('util');
//instantiate express
var app = express();
//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//JSON post
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 1337));
//use: for both POST and GET

//ID, name, surname, level and salary
var employeesID = [];
var employeesName = [];
var employeesSurname = [];
var employeesLevel = [];
var employeesSalary = [];
var maxId = 0;

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
    
    console.log("Find Employees - ID:" + request.body.id);
    var indiceElemento = employeesID.indexOf(parseInt(request.body.id));
    
    var json;
    if(indiceElemento == -1){
        console.log("Not Found...");
        json = JSON.stringify({
    	   esito: "notfound"
        });
    }
    else{
        console.log("Found...");
        //ID, name, surname, level and salary
        var returnObject = { id: employeesID[indiceElemento], name: employeesName[indiceElemento],
                        surname: employeesSurname[indiceElemento], level: employeesLevel[indiceElemento], 
                        salary: employeesSalary[indiceElemento]};
        json = JSON.stringify({
            esito: "found",
            retobj: returnObject
        });
    }    
    
    //send JSON
    response.end(json);

});

app.use('/DeleteEmployees', function(request, response) 
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
    
    console.log("Delete Employees - ID:" + request.body.id);
    var indiceElemento = employeesID.indexOf(parseInt(request.body.id));
    
    var json;
    if(indiceElemento == -1){
        console.log("Not Found...");
        json = JSON.stringify({
    	   esito: "notfound"
        });
    }
    else{
        console.log("Delete...");
        //ID, name, surname, level and salary
        employeesID.splice(indiceElemento, 1);
        employeesName.splice(indiceElemento, 1);
        employeesSurname.splice(indiceElemento, 1);
        employeesLevel.splice(indiceElemento, 1);
        employeesSalary.splice(indiceElemento, 1);
    }
    json = JSON.stringify({
        esito: "delete"
    });   
    
    //send JSON
    response.end(json);

});

app.use('/SaveEmployees', function(request, response) 
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
    
    console.log("Save or add Employees - ID:" + request.body.id);
    
    var idUsed = parseInt(request.body.id);
    
    if(request.body.id == ""){
        maxId = parseInt(maxId) + 1;
        idUsed = maxId;
        console.log("Save or add Employees - ID: (AUTO = " + idUsed + ")");
    }
    else{
        if(parseInt(maxId) < parseInt(request.body.id)){
            maxId = parseInt(request.body.id);
            idUsed = parseInt(request.body.id);
        }
    }
    
    var indiceElemento = employeesID.indexOf(idUsed);
    
    var json;
    if(indiceElemento == -1){
        console.log("Need to add...");
        employeesID.push(idUsed);
        employeesName.push(request.body.name);
        employeesSurname.push(request.body.surname);
        employeesLevel.push(request.body.level);
        employeesSalary.push(request.body.salary);
        json = JSON.stringify({
    	   esito: "saved"
        });
    }
    else{
        console.log("Need to update...");
        employeesID[indiceElemento] = idUsed;
        employeesName[indiceElemento] = request.body.name;
        employeesSurname[indiceElemento] = request.body.surname;
        employeesLevel[indiceElemento] = request.body.level;
        employeesSalary[indiceElemento] = request.body.salary;   
        json = JSON.stringify({
            esito: "saved"
        });
    } 
    
    //send JSON
    response.end(json);

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});