const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: string,
        required: true,
        unique: true
    },
    description: {
        type: string,
        require: true
    },
    link: {
        type: string,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: boolean,
        default: false
    }
});

const Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles