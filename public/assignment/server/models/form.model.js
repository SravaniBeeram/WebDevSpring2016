var mock = require("./form.mock.json");

module.exports = function(uuid) {

     var api = { createForm:createForm,
                 findAll:findAll,
                 findFormById:findFormById,
                 findFormsByUserId:findFormsByUserId,
                 deleteFormById:deleteFormById,
                 updateFormById:updateFormById,
                 findFormByTitle:findFormByTitle
     };

    return api;

    function createForm(userId,form){
        var form = {
            _id:uuid.v1(),
            title:form.title,
            userId:userId,
            fields:[]
        };
        mock.push(form);
        return mock;
    }

    function findAll(){
        return mock;
    }

    function findFormById(formId){
        for(var u in mock){
            if(mock[u]._id === formId){
                return mock[u];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        var userForms = [];
        for (u in mock) {
            if (mock[u].userId == userId) {
                userForms.push(mock[u]);
            }
        }
        return userForms;
    }

    function deleteFormById(formId){
        for(var u in mock) {
            if (mock[u]._id === formId) {
                mock.splice(u, 1);
            }
        }
        console.log(mock);
    }

    function updateFormById(formId, newForm){
        for(var u in mock) {
            if (mock[u]._id === formId) {
                mock[u] = newForm;
            }
        }
    }

    function findFormByTitle(title){
        for(var u in mock){
            if(mock[u].title === title){
                return(mock[u]);
            }
        }
        return null;
    }
};