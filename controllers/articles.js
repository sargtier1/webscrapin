const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/date");

const Article = require("../models/Articles");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            const articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Article.collection.insertMany(articles, { orderd:false }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function(query, cb) {
        Article.remove(query, cb);
    },
    get: function(query, cb) {
        Article.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    update: function(query, cb) {
        Article.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}