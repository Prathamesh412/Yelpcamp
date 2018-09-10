var express= require("express");
var router = express.Router();

var Campground=require("../models/campground");
var Comment=require("../models/comment");

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){

    Campground.findById(req.params.id, function(err,foundOneCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:foundOneCampground});
        }
    })
});

router.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundOneCampground){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,newComment){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("The body is "+ req.body.comment)
                    console.log("The new comment is "+ newComment)
                    foundOneCampground.comments.push(newComment);
                    foundOneCampground.save();
                    res.redirect("/campgrounds/" + foundOneCampground._id);
                }
             })            
        }
    })
});

router.get("/campgrounds/:id/comments/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

router.post("/campgrounds/:id/comments/:comment_id", function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,foundOneComment){
        if(err){
            console.log(err);
        }
        else{
//            console.log("This is the new"+ foundOneComment)
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

router.post("/campgrounds/:id/comments/:comment_id/delete", function(req, res){
  //  console.log("Inside comments Delete Route")
   Comment.findByIdAndRemove(req.params.comment_id,function(err, deleteComment){
       if(err){
           console.log(err)
       } else {
        res.redirect("/campgrounds/" + req.params.id);
       }
    });
})
function isLoggedIn(req,res,next){
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        console.log("inside") //req.isAuthenticated() will return true if user is logged in
        return next();
    }
    res.redirect("/login");
}

module.exports= router;