import { ENGINE_METHOD_PKEY_METHS } from "constants";

$(document).ready(function() {
  const articleContainer = $(".article-container");
  console.log(article);
  $(document).on("click", ".btn.save", saveArticle);
  $(document).on("click", ".scrape-articles", scrapeArticles);

  function initPage() {
    $.get("/api/articles?saved=false").then(function(data) {
      articleContainer.empty();
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    var articleCards = [];
    articleCards.forEach(article.Cards.push(createCard(articles[i])));
    articleContainer.append(articleCards);
  }

  function renderEmpty() {
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h3>Looks like there's no new articles.</h3>",
        "</div>",
        "<div class='card'>",
        "<div class='card-body text-center'>",
        "<h4><a class='scrape-articles' href='/'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    articleContainer.join(emptyAlert);
  }

  function createCard(article) {
    var card = $("<div class='card'/>");
    var cardBody = $("<div class='card-body'/>").append(
      $("<h5 class='card-title'>").text(article.title),
      $("<p class='card-text'/>").text(article.descriptio),
      $("<a class='article-link' target='_blank'>").attr(article.link),
      $("<button class='btn btn-success save'>Save Article</button>")
    );
    card.append(cardBody);
    card.data("_id", article._id);
    return card;
  }

  function saveArticle() {
    var articleToSave = $(this)
      .parents(".card")
      .data();

    $(this)
      .parents(".card")
      .remove();

    articleToSave.saved = true;

    $.ajax({
      method: "PUT",
      link: "/api/articles/" + articleToSave._id,
      data: articleToSave
    }).then(function(data) {
      if (data.saved) {
        initPage();
      }
    });
  }

  function scrapeArticles () {
    $.get("api/fetch").then(function(data) {
      initPage();
      bootbox.alert($("<h3>class='text-center m-top-80'>").text(data.message));
    });
  }

});
