// DEPENDENCIES
// ============================================================================================
    // middleware
    // ----------------------------------------------
    const express = require('express');
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static("public"));

    // handlebars
    // ----------------------------------------------
    const exphbs = require('express-handlebars');
    app.engine(
        "handlebars",
        exphbs({
          defaultLayout: "main"
        })
      );
      app.set("view engine", "handlebars");

    // port connection / listener
    // ----------------------------------------------
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, function () {
        console.log ("app is listening on port: " + PORT);
    })

    // mongodb connections
    // ----------------------------------------------
    const mongojs = require('mongojs');
    const databaseURL = 'Webscrapin';
    const collections = ['articles'];

    const db = mongojs(databaseURL, collections);

    // web scrapping
    // ----------------------------------------------
    const axios = require('axios');
    const cheerio = require('cheerio');

// db connection messages
db.on('error', function(error) {
    console.log('Database Error:', error);
})


// Cheerio and Axios to pull the title, description, and link (temporarly pushing into an array)
// I will later use this data and push into the MONGO DB
axios.get('https://apnews.com/').then(function (res) {
    const $ = cheerio.load(res.data);

    var articles = [];

    $('div.FeedCard.WireStory').each(function(i, element) {
        const title = $(element).find('h1').text();
        const description = $(element).find('div.content').children('p').text();
        const link = $(element).find('a.headline').attr('href');
        
        console.log (link)

        articles.push({
            title: title,
            description: description,
            link: "https://apnews.com" + link
        });
    });
    console.log(articles)
});

