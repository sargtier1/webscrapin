const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles