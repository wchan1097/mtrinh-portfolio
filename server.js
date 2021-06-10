const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function(request, response){
  response.sendFile(path.join(__dirname, "/src/home.html"));
})
console.log(__dirname);

app.use(express.static("public"));
app.listen(PORT);
console.log("Application listening on PORT " + PORT);