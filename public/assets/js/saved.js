import { ENGINE_METHOD_PKEY_METHS } from "constants";

$(document).ready(function() {
  const articleContainer = $(".article-container");
  console.log(article);
  $(document).on("click", ".btn.save", saveArticle);
  $(document).on("click", ".scrape-articles", scrapeArticles);
  $(document).on("click", ".btn.comment", handleArticleSave);
  $(document).on("click", ".btn.un-save", handleArticleScrape);


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
      $("<button class='btn btn-info comment fa fa-pencil'></button>"),
      $("<button class='btn btn-danger un-save'>X</button>")
    );
    card.append(cardBody);
    card.data("_id", article._id);
    return card;
  }

  function handleNoteDelete() {
    // This function handles the deletion of notes
    // First we grab the id of the note we want to delete
    // We stored this data on the delete button when we created it
    var noteToDelete = $(this).data("_id");
    // Perform an DELETE request to "/api/notes/" with the id of the note we're deleting as a parameter
    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(function() {
      // When done, hide the modal
      bootbox.hideAll();
    });
  }

 
  function deleteComment () {
      var deleteComment = $(this).data("_id");
      $.ajax({
          link: "/api/comments/" + deleteComments,
          method: "DELETE"
      }).then(function(){
          bootbox.hideall();
      })

  }
  


  //===========================================================================
});
