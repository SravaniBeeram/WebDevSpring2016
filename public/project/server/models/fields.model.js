
module.exports = function(uuid,pageModel){
    var api = {
        createField : createField,
        deleteField:deleteField,
        updateField:updateField,
        findField:findField,
        findFieldByPageId:findFieldByPageId
    };

    return api;

    function createField(pageId,field){
        field._id = uuid.v1();
        var page = pageModel.findPageById(pageId);
        page.fields.push(field);
        console.log("server" +page.fields);
;    }

    function  deleteField(pageId,fieldId){
        var page = pageModel.findPageById(pageId);
        var fields = page.fields;
        for(var u in fields){
            if(fields[u]._id == fieldId){
                fields.splice(u,1);
            }
        }
    }

    function  updateField(pageId,fieldId,field){
        var page = pageModel.findPageById(pageId);
        var fields= page.fields;
        for(var u in fields){
            if(fields[u]._id ==fieldId){
                fields[u] = field;
            }
        }
    }

    function findField(pageId,fieldId){
        var page = pageModel.findPageById(pageId);
        var fields = page.fields;
        for(var u in fields){
            if(field[u]._id == fieldId){
                return fields[u];
            }
        }
    }

    function findFieldByPageId(pageId){
        var page = pageModel.findPageById(pageId);
        return page.fields;
    }
};