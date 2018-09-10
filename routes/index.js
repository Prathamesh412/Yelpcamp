var express= require("express");
var router = express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
});

router.get("/register",function(req, res){
    res.render("register");
});

router.post("/register",function(req, res){
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/login');
        });
    });
});

router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds"); 
 });

function isLoggedIn(req,res,next){
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        console.log("inside") //req.isAuthenticated() will return true if user is logged in
        return next();
    }
    res.redirect("/login");
}

module.exports= router;