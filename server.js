// DEPENDENCIES
// ============================================================================================
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 8080;

const app = express();
const router = express.Router();

require('./config/routes')(router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
  
app.use(router);


const db = process.env.MONGODB_URI || "mongodb://localhost/Webscrapin"

mongoose.connect(db, function (err) {
    if (err) {
        console.log("An error has occured connectiong with the database" + err)
    } else {
        console.log("Conenction with database is successful")
    }
})

app.listen(PORT, function () {
    console.log ("app is listening on port: " + PORT);
})

