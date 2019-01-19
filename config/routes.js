const scrape = require("../scripts/scrape");

const articlesController = require("../controllers/articles");
const commentsController = require("../controllers/comments");

module.exports = function(router) {
    router.get("/", function (req,res) {
        res.render("home");
    });

    router.get("/saved", function (req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function (req, res) {
        articlesController.fetch(function(err, docs){
            if (!docs || docs.insertedcount === 0) {
                res.json ({
                    message: "No new articles. Please try again later."
                });
            }
            else {
                res.json ({
                    message: "Added " + docs.insertedcount + " new articles!"
                });
            }
        });
    });

    router.get("/api/articles", function (req, res){
        const query = {};
        if (req.query.saved) {
            query = req.query
        }

        articlesController.get(query, function(data){
            res.json(data);
        });
    });

    router.delete("/api/articles/:id", function (req, res){
        const query = {};
        query._id = req.params.id;

        articlesController.delete(query, function(err, data){
            res.json(data);
        });
    });

    router.patch("/api/articles", function (req, res){
        articlesController.update(req.body, function(err, data){
            res.json(data);
        });
    });

    router.get("/api/notes/:articles_id?", function (req, res) {
        const query = {};
        if (req.params.articles_id) {
            query._id = req.params.articles_id
        }
        commentsController.get(query, function (err, data){
            res.json(data);
        });
    });

    router.delete("/api/notes/:id", function (req, res) {
        const query = {};
        if (req.params.articles_id) {
            query._id = req.params.id
        }
        commentsController.delete(query, function (err, data){
            res.json(data);
        });
    });

    router.psot("/api/notes", function (req, res) {
        commentsController.save(query, function (data){
            res.json(data);
        });
    });



}