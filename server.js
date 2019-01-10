const axios = require('axios');
const cheerio = require('cheerio');

// Cheerio and Axios to pull the title, description, and link (temporarly pushing into an array)
axios.get('https://apnews.com/').then(function (res) {
    const $ = cheerio.load(res.data);

    var results = [];

    $('div.FeedCard.WireStory').each(function(i, element) {
        const title = $(element).find('h1').text();
        const description = $(element).find('div.content').children('p').text();
        const link = $(element).find('a.headline').attr('href');
        
        console.log (link)

        results.push({
            title: title,
            description: description,
            link: "https://apnews.com" + link
        });
    });
    console.log(results)
})