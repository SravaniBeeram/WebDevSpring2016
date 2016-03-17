var mock = require("./form.mock.json");

module.exports = function(app) {

     var api = { createForm:createForm,
                 findAll:findAll,
                 findFormById:findFormById,
                 findAllFormsForUser:findAllFormsForUser,
                 deleteFormById:deleteFormById,
                 updateFormById:updateFormById,
                 findFormByTitle:findFormByTitle
     }

    return api;

    function createForm(userId,formName){
        var form = {
            _id:(new Date).getTime(),
            title:formName,
            userId:userId
        };
        mock.push(form);
        return(form);
    }

    function findAll(){
        return(mock);
    }

    function findFormById(formId){
        for(var u in mock){
            if(mock[u]._id === formId){
                return mock[u];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId){
        console.log("form.model.js");
        var userForms = [];
        for(var u in mock) {
            if (mock[u].userId === userId) {
                userForms.push(mock[u]);
            }
        }
        return(userForms);
    }

    function deleteFormById(formId){
        for(var u in mock) {
            if (mock[u]._id === formId) {
                mock.splice(u, 1);
                break;
            }
        }
        return(mock);
    }

    function updateFormById(formId, newForm){
        for(var u in mock) {
            if (mock[u]._id === formId) {
                mock[u] = newForm;
                break;
            }
        }
        return(mock[u]);
    }

    function findFormByTitle(title){
        for(var u in mock){
            if(mock[u].title === title){
                return(mock[u]);
            }
        }
        return null;
    }
}