const express = require("express");
const bodypaser = require("body-parser");
const date = require(__dirname + "/date.js");

// -------------------------------------------

const app = express();
const items = [];
const workItems = [];

// -------------------------------------------

app.set("view engine", "ejs");
app.use(bodypaser.urlencoded({ extended: true }));
app.use(express.static("public"));

// -------------------------------------------

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

// -------------------------------------------

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

// -------------------------------------------

app.get("/about", function (req, res) {
  res.render("about");
});

// -------------------------------------------

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
// -------------------------------------------

// creates local server on port 3000
app.listen(3000, function () {
  console.log("server started on port 3000");
});

// -------------------------------------------
