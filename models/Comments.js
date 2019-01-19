const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
  _articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article"
  },
  Date: {
      type: string,
      default: Date.now
  },
  commentText: string
});

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;