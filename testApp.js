//ece.skule.ca server
//by Majd Hailat - majdhailat64@gmail
//the testApp.js is an exact copy of this file minus all the mysql code cuz
//i dont have mysql on my computer
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const md5 = require("md5");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("home", {//rendering home page, passing in all posts as well as if request is authenticated
      posts: [],
      isAuth: isAuth(req)
    });
  });
});

app.get("/about", function(req, res) {
  res.render('about');
});

app.get("/constitution", function(req, res) {
  res.render('constitution');
});

app.get("/contact", function(req, res) {
  res.render('contact');
});

app.get("/success", (req, res) => {
  req.render('success')
})

app.post("/login", (req, res) => {
  if (req.body.password === process.env.PASSWORD) {//checking for correct password
    res.cookie('token', md5(process.env.PASSWORD));//setting a cookie with the user
    res.send({
      success: true,
    });
  } else {
    res.send({
      success: false
    });
  }
});

app.get("/compose", function(req, res) {
  if (isAuth(req)) {//checking if theyre authenticated
    res.render('compose');
  } else {
    res.redirect("/");
  }
});

app.get("/edit-posts", function(req, res) {
  if (isAuth(req)) {
      res.render("edit-posts", {
        //rendering edit posts page, passing in all posts
        posts: [],
      });
    // });
  } else {
    res.redirect("/");
  }
})

app.post("/delete-post", function(req, res) {
  res.redirect("/edit-posts")
});

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var weekDays = ["Sunday", "Monday", "Tueday", "wednesday", "Thuday", "Friday", "Satday"]
app.post("/compose", function(req, res) {
  res.redirect("/");
});

function isAuth(req) {
  if (req.cookies.token === md5(process.env.PASSWORD)) {//checking for auth
    return true;
  }
  return false;
}

app.listen(61000, function() {
  console.log("Server started on port 61000.");
});
