module.exports = function(app,pageModel){
    app.post("/api/project/pages", createPageForUser);
    app.get("/api/project/pages",findAllPages);
    app.get("/api/project/pages/:userId",findPagesById);
    app.put("/api/project/pages/:pageId",updatePageById);
    app.delete("/api/project/pages/:pageId",deletePageById);
    app.get("/api/project/page/:pageId",findPagesByPageId);

    function findPagesByPageId(req,res){
        var pageId = req.params.pageId;
        res.json(pageModel.findPageById(pageId));

    }

    function createPageForUser(req,res){
        var page=req.body;
        res.json(pageModel.createPageForUser(page));
    }

    function findAllPages(req,res){
        res.json(pageModel.findAllPages());
    }

    function findPagesById(req,res){
        var userId =req.params.userId;
        res.json(pageModel.findPagesForUser(userId));
    }

    function updatePageById(req,res){
        var pageId =req.params.pageId;
        var page = req.body;
        res.json(pageModel.updatePageById(pageId,page));
    }

    function deletePageById(req,res){
        var pageId =req.params.pageId;
        res.json(pageModel.deletePageById(pageId));
    }

};