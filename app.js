var express = require("express");
var app = express ();
app.set("view engine", "ejs");
var mongoose= require("mongoose");
var methodOverride = require("method-override")
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var User=require("./models/user");
var SeedDB= require("./seeds")
var passport = require("passport");
var LocalStrategy = require("passport-local");

var commentRoutes= require("./routes/comments");
var indexRoutes= require("./routes/index");
var campgrondRoutes= require("./routes/campground");

//SeedDB();
//mongoose.connect("mongodb://localhost/yelp_camp");    //connect to local database
mongoose.connect("mongodb://admin:admin123@ds151892.mlab.com:51892/yelpcamp_db") //mongolab cloud connect
var bodyParser = require('body-parser');

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//* Passport //

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){ //for user to work everywhere. important
    res.locals.currentUser=req.user;
    next(); //to move to the next middleware
})

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgrondRoutes);
// Campground.create({
//     name:"Dennis Creek", 
//     image:"https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144290f0c97cafedb6_340.jpg",
//     description:"This is a huge Creek. No water available. Beatiful and sceneric"
// },function(err,campground){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("new campground created");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//     { name:"Soloman Creek", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f5c171a2e5b5bb_340.jpg"},
//     { name:"Dennis Creek", image:"https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144290f0c97cafedb6_340.jpg"},
//     { name:"Joseph Creek", image:"https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104496f5c171a2e5b5bb_340.jpg"},
//     { name:"Darren Creek", image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"}
// ]

//Routes


app.listen(process.env.PORT || 3000, () => console.log('App listening on port 3000!'));