/**
 * @brief this function sends a JSON request and process a JSON response
 * @return nothing
 */
function FindEmployees(){
    var data = {};
    document.getElementById("labelAvvisi").innerHTML = "";
    var id = document.getElementById("inputFind").value;
    if(id.toString() != "")
    {
        data["id"] = document.getElementById("inputFind").value;
    }
    else
    {
        document.getElementById("labelAvvisi").innerHTML = "Insert ID";
        return;
    }
    //construct" "an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("post", "http://127.0.0.1:1337/FindEmployees", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //send the collected data as JSON
    xhr.send(JSON.stringify(data));
    xhr.onloadend = function () 
    {
        var result=xhr.responseText;
        var jsonresult = JSON.parse(result);
        var esito = jsonresult.esito;
        console.log(result);
        if(esito == "found"){
            document.getElementById("inputNewId").value = jsonresult.retobj.id;
            document.getElementById("inputNewName").value = jsonresult.retobj.name;
            document.getElementById("inputNewSurname").value = jsonresult.retobj.surname;
            document.getElementById("inputNewLevel").value = jsonresult.retobj.level;
            document.getElementById("inputNewSalary").value = jsonresult.retobj.salary;
            document.getElementById("divAdd").style.visibility = 'visible';
        }else{
            document.getElementById("labelAvvisi").innerHTML = "ID not found!";
            document.getElementById("inputNewId").value = "";
            document.getElementById("inputNewName").value = "";
            document.getElementById("inputNewSurname").value = "";
            document.getElementById("inputNewLevel").value = "";
            document.getElementById("inputNewSalary").value = "";
            document.getElementById("divAdd").style.visibility = 'hidden';
        }
    };
};

function showNew(){
    var divInserimento = document.getElementById("divAdd");
    if(divInserimento.style.visibility == 'visible'){
        document.getElementById("divAdd").style.visibility = 'hidden';
    }else{
        document.getElementById("divAdd").style.visibility = 'visible';
    }
    document.getElementById("inputNewId").value = "";
    document.getElementById("inputNewName").value = "";
    document.getElementById("inputNewSurname").value = "";
    document.getElementById("inputNewLevel").value = "";
    document.getElementById("inputNewSalary").value = "";
}

function employeSave(){
    var employeId = document.getElementById("inputNewId");
    var employeName = document.getElementById("inputNewName");
    var employeSurname = document.getElementById("inputNewSurname");
    var employeLevel = document.getElementById("inputNewLevel");
    var employeSalary = document.getElementById("inputNewSalary");
    
    var message = "";
    if(employeName.value.toString() == ""){
        message = message + "Name (REQUIRED) ";
    }
    if(employeSurname.value.toString() == ""){
        message = message + "Surname (REQUIRED) ";
    }
    if(employeLevel.value.toString() == ""){
        message = message + "Level (REQUIRED) ";
    }
    if(employeSalary.value.toString() == ""){
        message = message + "Salary (REQUIRED) ";
    }
    if(message.toString() != ""){
        document.getElementById("labelAvvisi").innerHTML = message;
    }
    else{
        var data = {};
    
        data["id"] = employeId.value;
        data["name"] = employeName.value;
        data["surname"] = employeSurname.value;
        data["level"] = employeLevel.value;
        data["salary"] = employeSalary.value;
        //construct" "an HTTP request
        var xhr = new XMLHttpRequest();
        xhr.open("post", "http://127.0.0.1:1337/SaveEmployees", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        //send the collected data as JSON
        xhr.send(JSON.stringify(data));
        xhr.onloadend = function () 
        {
            var result=xhr.responseText;
            var jsonresult = JSON.parse(result);
            var esito = jsonresult.esito;
            console.log(result);
            if(esito == "saved"){
                document.getElementById("labelAvvisi").innerHTML = "Employe saved!";
                document.getElementById("divAdd").style.visibility = 'hidden';
                employeId.value = "";
                employeName.value = "";
                employeSurname.value = "";
                employeLevel.value = "";
                employeSalary.value = "";
            
            }else{
                document.getElementById("labelAvvisi").innerHTML = "Saving error!";
            }
        };
    }
}

function employeDelete(){
    var data = {};
    document.getElementById("labelAvvisi").innerHTML = "";
    var id = document.getElementById("inputDelete").value;
    if(id.toString() != "")
    {
        data["id"] = document.getElementById("inputDelete").value;
    }
    else
    {
        document.getElementById("labelAvvisi").innerHTML = "Insert ID";
        return;
    }
    //construct" "an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("post", "http://127.0.0.1:1337/DeleteEmployees", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //send the collected data as JSON
    xhr.send(JSON.stringify(data));
    xhr.onloadend = function () 
    {
        var result=xhr.responseText;
        var jsonresult = JSON.parse(result);
        var esito = jsonresult.esito;
        console.log(result);
        if(esito == "delete"){
            document.getElementById("labelAvvisi").innerHTML = "Employe delete!";
        }else{
            document.getElementById("labelAvvisi").innerHTML = "ID not found!";
        }
        document.getElementById("divAdd").style.visibility = 'hidden';
        employeId.value = "";
        employeName.value = "";
        employeSurname.value = "";
        employeLevel.value = "";
        employeSalary.value = "";
    };
}