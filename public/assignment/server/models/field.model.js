
module.exports = function(uuid,formModel){
    var api = {
        createField : createField,
        deleteField:deleteField,
        updateField:updateField,
        findField:findField,
        findFieldByFormId:findFieldByFormId
    };

    return api;

    function createField(formId,field){
        field._id = uuid.v1();
        var form = formModel.findFormById(formId);
        form.fields.push(field);
    }

    function  deleteField(formId,fieldId){
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for(var u in fields){
            if(fields[u]._id == fieldId){
                fields.splice(u,1);
            }
        }
    }

    function  updateField(formId,fieldId,field){
        var form = formModel.findFormById(formId);
        var fields= form.fields;
        for( u  in fields){
            if(fields[u]._id ==fieldId){
                fields[u] = field;
            }
        }
        return null;
    }

    function findField(formId,fieldId){
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for(u in fields){
            if(field[u]._id == fieldId){
                return fields[u];
            }
        }
    }

    function findFieldByFormId(formId){
        var form = formModel.findFormById(formId);
        return form.fields;
    }
};