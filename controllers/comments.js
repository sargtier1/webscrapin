const Comments = require("../scripts/comments");
const makeDate = require("../scripts/date");

module.exports = {
    get: function (data, cb) {
        Comments.find({
            _articlesId: data._id,
        }, cb);
    },
    save: function (data, cb) {
        const newComment = {
            _articlesId: data._id,
            date: makeDate(),
            commentText: data.commentText
        };

        Comments.create(newComment, function (err, doc) {
            if (err) throw err;
            else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    delete: function (data, cb) {
        Comments.remove({
            _id: data._id
        }, cb);
    }
}
