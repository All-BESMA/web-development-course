//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require(__dirname + "/models/article.js").Article;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

app.get("/", function(req, res){
	res.send("Hello World!");
});

app.route("/articles")
	.get(function(req, res){
		Article.find({}, function(err, foundArticles){
	    if(err){
	      console.log("Error fetching DB articles: " + err);
	    }else{
	      console.log(foundArticles);
				res.send(foundArticles);
	    }
	  });
	})

	.post(function(req, res){
		const articleTitle = req.body.title;
		const articleContent = req.body.content;

		Article.findOne({title: articleTitle}, function(err, foundArticle){
			if(!foundArticle){
				const newArticle = new Article({title: articleTitle, content: articleContent});
				newArticle.save(function(err){
					if(err) res.send(err);
				});
			}

			res.redirect("/articles/" + articleTitle);
		});
	})

	.delete(function(req, res){
		Article.deleteMany({}, function(err){
			if(err) res.send(err);
			else res.redirect("/articles");
		});
	});


app.route("/articles/:articleTitle")
	.get(function(req, res){
		let articleTitle = req.params.articleTitle;

		Article.findOne({title: articleTitle}, function(err, foundArticle){
			if(!foundArticle || err){
				let errorMessage = "Didn't found an article entitled " + articleTitle + ". Err: " + err;
				console.log(errorMessage);
				res.send(errorMessage);
			}else{
				res.send(foundArticle);
			}
		});
	})

	.put(function(req, res){
		let oldArticleTitle = req.params.articleTitle;
		let newArticleTitle = req.body.title;
		let articleContent = req.body.content;

		Article.update({title: oldArticleTitle},
									 {title: newArticleTitle, content: articleContent},
									 {overwrite: true},
									 function(err){
									 		if(err) res.send(err);
									 		else res.redirect("/articles/" + newArticleTitle);
									 });
	})

	.patch(function(req, res){
		let oldArticleTitle = req.params.articleTitle;
		let articleTitle = req.body.title || req.params.articleTitle;

		Article.update(
			{title: oldArticleTitle},
			{$set: req.body},
			function(err){
		 		if(err) res.send(err);
		 		else res.redirect("/articles/" + articleTitle);
			});
	})

	.delete(function(req, res){
		let articleTitle = req.params.articleTitle;

		Article.deleteOne({title: articleTitle}, function(err){
			if(err) res.send(err);
			else res.redirect("/articles");
		})
	});


app.listen(3000, function(){
	console.log("Server running on port 3000");
});
