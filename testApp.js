const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const md5 = require("md5");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '@gmail.com',
    pass: 'p'
  }
});

// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "ececlub_webmaster",
//   password: "snowMonkey",
//   database: "ececlub_posts"
// });
//
// con.connect(function(err) {
//   if (err) throw err;
// });

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

function Post(title, body, date) {
  this.title = title
  this.body = body
  this.date = date
}

app.get("/", function(req, res) {
  // con.query("SELECT * FROM post ORDER BY id DESC", function(err, result, fields) {
  //   if (err) throw err;
  //   res.render("home", {
  //     posts: result,
  //     isAuth: isAuth(req)
  //   });
  // });
  res.render('home', {
    posts: [new Post("title", "body", "date")],
    isAuth: isAuth(req)
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

app.post("/contact", function(req, res) {
  ejs.renderFile(__dirname + "/views/feedbackEmail.ejs", {
    title: req.body.title,
    body: req.body.body
  }, function(err, data) {
    if (err) {
      res.render('success');
      console.log(err);
    } else {
      var mailOptions = {
        from: '@gmail.com',
        to: '@gmail.com',
        subject: "ECE CLUB ANONYMOUS FEEDBACK",
        html: data
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  })
});

var password = "richBirthday472";
app.post("/login", function(req, res) {
  if (req.body.password === password) {
    res.cookie('token', md5(req.body.password))
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
  if (isAuth(req)) {
    res.render('compose');
  } else {
    res.redirect("/");
  }
});

app.get("/edit-posts", function(req, res) {
  if (isAuth(req)) {
    // con.query("SELECT * FROM post ORDER BY id DESC", function(err, result, fields) {
    //   if (err) throw err;
    //   res.render("edit-posts", {
    //     posts: result,
    //   });
    // });
    res.render("edit-posts", {
      posts: [new Post("title", "body", "date")],
    });
  } else {
    res.redirect("/");
  }
})

app.post("/delete-post", function(req, res) {
  if (isAuth(req)) {
    // var sql = "DELETE FROM post WHERE id = '" + req.body.postID + "'";
    // con.query(sql, function(err, result) {
    //   if (err) throw err;
    // });
  }
  res.redirect("/edit-posts")
});

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var weekDays = ["Sunday", "Monday", "Tueday", "Wednesday", "Thuday", "Friday", "Satday"]
app.post("/compose", function(req, res) {
  if (isAuth(req)) {
    var d = new Date();
    var date = "" + weekDays[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    var title = req.body.title;
    var body = req.body.body;

    // var sql = "INSERT INTO post (title, body, date) VALUES ('" + title + "', '" + body + "', '" + date + "')";
    // con.query(sql, function(err, result) {
    //   if (err) throw err;
    // });
  }
  res.redirect("/");
});

function isAuth(req) {
  if (req.cookies.token === md5(password)) {
    return true;
  }
  return false;
}

app.listen(61000, function() {
  console.log("Server started on port 61000.");
});
