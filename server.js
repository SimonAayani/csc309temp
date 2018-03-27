var path = require("path");

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const User = require("./lib/user");

var db

app.use(express.static(path.join(__dirname, '/public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(bodyParser.urlencoded({extended: true}))

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
				  res.sendFile(__dirname + '/index.html')
				})

app.post("/login", (req, res) => {
	var username = req.body.user_login;
	var password = req.body.pass_login;

	User.findOne({username: username, password: password}, function(err, user){
		if(err){
			console.log(err);
		}
		if(!user){
			console.log("no such user");
			
		}else {
			console.log(user.email)
		}
		res.redirect('/')
	})
	
})
app.post('/register', (req, res) => {
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
	});

	res.redirect('/')

	  // db.collection('users').save(newuser, (err, result) => {
	  //   if (err) return console.log(err)

	  //   console.log('saved to database')
	  //   res.redirect('/')
	  // }) 	
})



