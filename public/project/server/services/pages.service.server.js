module.exports = function(app,pageModel){
    app.post("/api/project/pages", createPageForUser);
    app.get("/api/project/pages",findAllPages);
    app.get("/api/project/pages/:userId",findPagesByUserId);
    app.put("/api/project/pages/:pageId",updatePageById);
    app.delete("/api/project/pages/:pageId",deletePageById);
    app.get("/api/project/page/:pageId",findPageByPageId);

    function findPageByPageId(req,res){
        var pageId = req.params.pageId;
        pageModel.findPageById(pageId)
            .then(function(page){
                res.json(page);
            },function(err){
                res.status(400).send(err);
            });

    }

    function createPageForUser(req,res){
        var page=req.body;
        pageModel.createPageForUser(page)
            .then(function(page){
                res.json(page);
            },function(err){
                res.status(400).send(err);
            });
    }

    function findAllPages(req,res){
        res.json(pageModel.findAllPages());
    }

    function findPagesByUserId(req,res){
        var userId =req.params.userId;
        pageModel.findPagesForUser(userId)
            .then(function(pages){
                res.json(pages);
            },function(err){
                res.status(400).send(err);
            });
    }

    function updatePageById(req,res){
        var pageId =req.params.pageId;
        var page = req.body;
        pageModel.updatePageById(pageId,page)
            .then(function(page){
                res.json(page)
            },function(err){
                res.status(400).send(err);
            });
    }

    function deletePageById(req,res){
        var pageId =req.params.pageId;
        pageModel.deletePageById(pageId)
            .then(function(stats){
                res.send(200);
            },function(err){
                res.status(400).send(err);
            });
    }

};