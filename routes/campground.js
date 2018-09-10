
var express= require("express");
var router = express.Router();

var Campground=require("../models/campground");
//var Comment=require("../models/comment");

router.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/campgrounds",{campgrounds:allcampgrounds,currentUser: req.user})
        }
    })
});

router.post("/campgrounds",function(req,res){
 //   res.send("You are in post requests")
 var name = req.body.name;
 var image = req.body.image;
 var description = req.body.description;
 //console.log(name,image);
 var newCampground= {name:name,image:image,description:description}

 Campground.create(newCampground,function(err,newCreatedCampground){
    if(err){
        console.log(err);
    }
    else{
        console.log(newCreatedCampground);
        res.redirect("/campgrounds");
    }
 })
 //campgrounds.push(newCampground);
});

router.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id",function(req,res){ // find the campground,populate with comments and the execute
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundOneCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show",{campground:foundOneCampground});
           // console.log(campground);
        }
    })
});

router.get("/campgrounds/:id/edit",function(req, res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/edit",{campground:foundCampground})
        }
    })
});

router.post("/campgrounds/:id", function(req, res){
    
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           console.log("inside post else loop")
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
    //redirect to show page
 });

 router.post("/campgrounds/:id/delete", function(req, res){
     console.log("internal")
    Campground.findByIdAndRemove({_id:req.params.id},function(err, deletedCampground){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campgrounds");
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

module.exports = router
