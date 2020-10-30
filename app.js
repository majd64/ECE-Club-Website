//ece.skule.ca server
//by Majd Hailat - majdhailat64@gmail
//the testApp.js is an exact copy of this file minus all the mysql code cuz
//i dont have mysql on my computer
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const md5 = require("md5");
var mysql = require('mysql');

//connecting to database
var con = mysql.createConnection({
  host: "localhost",
  user: "ececlub_webmaster",
  password: "snowMonkey",
  database: "ececlub_posts"
});

con.connect( err => {
  if (err) throw err;
});

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  con.query("SELECT * FROM post ORDER BY id DESC", function(err, result, fields) {//getting all posts from db
    if (err) throw err;
    res.render("home", {//rendering home page, passing in all posts as well as if request is authenticated
      posts: result,
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
  res.render('success')
})

var password = "similarThrow102";//password to make a post
app.post("/login", (req, res) => {
  if (req.body.password === password) {//checking for correct password
    res.cookie('token', md5(req.body.password));//setting a cookie with the user
    //to keep them authenticated so that after they get redirected to compose
    //they will still be authenticated
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
    con.query("SELECT * FROM post ORDER BY id DESC", (err, result, fields) => {
      //getting all posts again to display in the edit posts page
      if (err) throw err;
      res.render("edit-posts", {
        //rendering edit posts page, passing in all posts
        posts: result,
      });
    });
  } else {
    res.redirect("/");
  }
})

app.post("/delete-post", function(req, res) {
  if (isAuth(req)) {
    var sql = "DELETE FROM post WHERE id = '" + req.body.postID + "'";
    //deleting post specific by the request body
    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  }
  res.redirect("/edit-posts")
});

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var weekDays = ["Sunday", "Monday", "Tueday", "wednesday", "Thuday", "Friday", "Satday"]
app.post("/compose", function(req, res) {
  if (isAuth(req)) {
    var d = new Date();
    //creating the data string
    var date = "" + weekDays[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    var title = req.body.title;//post title
    var body = req.body.body;//post body
    title = title.replace(/'/g, '"');
    body = body.replace(/'/g, '"');

    //adding post to db
    var sql = "INSERT INTO post (title, body, date) VALUES ('" + title + "', '" + body + "', '" + date + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  }
  res.redirect("/");
});

function isAuth(req) {
  if (req.cookies.token === md5(password)) {//checking for auth
    return true;
  }
  return false;
}

app.listen(61000, function() {
  console.log("Server started on port 61000.");
});
