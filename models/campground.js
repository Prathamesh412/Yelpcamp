var mongoose=require("mongoose");

var campgroundSchema= new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"  //Name of the model.ref field means in which collection the id mentioned is going to be searched for
    }]
});

module.exports= mongoose.model("Campground",campgroundSchema);