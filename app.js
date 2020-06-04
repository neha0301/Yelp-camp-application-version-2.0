var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Campground=mongoose.model("Campground",campgroundSchema);

//Campground.create({
	//name: "The snow camp",
	//image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgS1XoCdmWsS1pa34sN3iRIPY9BLSF-JVY4WQ7N3P_4Q0YeKtW&usqp=CAU",
	//description: "A place you're gonna fall in love with. Nature is waiting for you to have a taste of this blissfull campground!"
	
//},function(err,campground){
	//if(err)
		//{
			//console.log("error!");
		//}
	//else
		//{
			//console.log("saved!");
			//console.log(campground);
		//}
//});

app.get("/",function(req,res){
	res.render("landing.ejs");
})
app.get("/campgrounds",function(req,res){
	
	Campground.find({},function(err,allcampgrounds){
		if(err)
			{
				console.log("OOPS!ERROR!");
			}
		else
			{
				res.render("campgrounds.ejs",{campgrounds: allcampgrounds });
			}
	});
	//res.render("campgrounds.ejs",{campgrounds: campgrounds});
})

app.post("/campgrounds",function(req,res){
	var name= req.body.name;
	var image= req.body.image;
	var description = req.body.description;
	var newCampground= {name: name,image: image, description: description};
	//campgrounds.push(newCampground);
	Campground.create(newCampground,function(err,campground){
		if(err)
			{
				console.log("An error has occured!");
			}
		else
			{
				console.log("works fine!");
				res.redirect("/campgrounds");
				
			}
	})
	
})

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
})

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,foundcampground){
		if(err)
			{
				console.log(err);
			}
		else
			{
				res.render("show.ejs",{campground: foundcampground});
			}
	})
	//res.render("show.ejs");
})


app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Server started for YelpCamp!");
})
