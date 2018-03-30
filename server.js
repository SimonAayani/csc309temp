var path = require("path");

const express = require('express');
const bodyParser= require('body-parser');
var http = require('http');
const app = express();
const User = require("./lib/user");
var session = require("express-session");
var cookieParser = require('cookie-parser');
var passport = require('passport');

var db

app.use(express.static(path.join(__dirname, '/public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(cookieParser());	
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'lkJSadib7832lQA02k18snf0sdsak192j29j10DJ2',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

  var MongoClient = require('mongoose');
  //Since I failed to update to csc309 mongo account due to auth issues, i will be using the mongo acc i created
    var url = "mongodb://simon:salamsalam12@ds125479.mlab.com:25479/testing"
  //This is the collection name for this database
  	var name = "wherearethedogs"


    MongoClient.connect(url, function(err,client){
				if(err) console.log(err)
				// db = client.db("testing");
				//creates index constraint on the user database such that no duplicate uid can exist
				app.listen(3000, function() {
  					console.log('listening on 3000')
				})
				

				
			  	//closes connection

    });
app.get('/', (req, res) => {
	 if(!req.session.user){
		console.log("hi" + req.session.user)
  		res.sendFile(__dirname + '/public/index.html')
  		
  	} else {
  		console.log("logged" + req.session.user.username)
  		// res.sendFile(__dirname + '/logged.html')
  	}
})

app.post("/login", (req, res) => {
	var username = req.body.user_login;
	var password = req.body.pass_login;
	 if(!req.session.User){
	User.findOne({username: username, password: password}, function(err, user){
		if(err){
			console.log(err);
		}
		if(!user){
			console.log("no such user");
		}
			console.log(user.username)
			req.session.user = user;
			// res.cookie("username")	
			// console.log(res.cookie)
			// res.cookie(username:"hi")
			// console.log(req.cookies)
			res.redirect('/dash')
			
		
	})
	
	} else {
		res.redirect('/dash')
	}

	
})
app.post('/register', (req, res) => {
	if(!req.session.User){
		var firstName = req.body.f_name;
		var lastName = req.body.l_name;
		var email = req.body.email;
		var username = req.body.user;
		var password = req.body.pass;
		var postalCode = req.body.zip;

		var newuser = new User();
		newuser.firstName = firstName;
		newuser.lastName = lastName;
		newuser.email = email;
		newuser.username = username;
		newuser.password = password;
		newuser.postalCode = postalCode;

		newuser.save(function(err, savedUser){
			if(err){
				console.log(err);
			}
			console.log("submitted");
			return res.status(200).send();
		});

		res.redirect('/dash')

		  // db.collection('users').save(newuser, (err, result) => {
		  //   if (err) return console.log(err)

		  //   console.log('saved to database')
		  //   res.redirect('/')
		  // }) 	
	} else {
		res.redirect('/dash')
	}

})

//POST LOGING PAGES HERE

app.get('/dash', function(req, res){
	if(!req.session.user){
		return res.status(401).send();
	} else {
		
		res.sendFile(__dirname + '/public/logged.html')
	}
})

app.get('/logout', function(req,res){
	res.sendFile(__dirname + '/public/index.html')
	req.session.destroy();
	console.log(req.session);
})
	