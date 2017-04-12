var express = require('express'),
    _       = require('lodash'),
    config  = require('./app/config'),
    jwt     = require('jsonwebtoken');

// var config = require('../config')
var mongoClient = require('mongodb').MongoClient
var db
var collection

mongoClient.connect(config.connectionString, function (err, database) {
  if (err)
    console.log(err)
  else {
      db = database
      collection = db.collection('users')
  }
})

var country = require("./country");

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
var users = [{
  id: 1,
  username: 'gonto',
  password: 'gonto'
}];

var utils = require('./utils');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

function getUserScheme(req) {
  
  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

app.get('/country', function(req, res) {
  res.status(200).send(country);
});


app.get('/users', function(req, res) {

  db.collection('users').find().toArray(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data)
    }
  })  

});

app.post('/users1111', function(req, res) {
  
  var userScheme = getUserScheme(req);  

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  if (_.find(users, userScheme.userSearch)) {
   return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile)
  });
});

app.post('/users', function(req, res) {

  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  // if (_.find(users, req.body.userSearch)) {
  //  return res.status(400).send("A user with that username already exists");
  // }


  db.collection('users').find({email : req.body.email}).toArray(function(err, docs) {
      if ( err ) {
        res.send(err)
        return
      }            

      if (docs.length === 0) {

          utils.insertDocument(
              req.body,
              collection
          );

          res.send();
      } else {
        res.status(500).send('Duplicate error')            
      }
  })

});
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1N2U1ZmQwOGQwNWM3YzY5YTg0NDUzNjkiLCJ1c2VybmFtZSI6IlNhbmdidW0gV29vIiwiZW1haWwiOiJzYndvbzg3QGdtYWlsLmNvbSIsImJpcnRoZGF5IjoiMTk2Ni0wNC0zMCIsInNleCI6Im1hbGUiLCJjb3VudHJ5IjoiS1IiLCJpYXQiOjE0NzQ2OTc1ODUsImV4cCI6MTQ3NDcxNTU4NX0.ahgIM5cM-hxDjz9NYnus2JrX9YM1exm1aEh4MKCOW0I
app.post('/sessions/create', function(req, res) {

  // return res.send(req.body)

  db.collection('users').findOne({email : req.body.email}, function(err, user) {
      if ( err ) {
        res.send(err)
        return
      }

      if (!user || user.password != req.body.password) {
        return res.status(401).send("Autheication failed")
      }

      

      delete user.password            

      res.status(201).send({
        id_token: createToken(user)
      });
  });

});

app.delete('/users/:email', function(req, res) {
  //res.send({}"delete user :" + req.params.id)
//remove({_id: ObjectId("4f6f244f6f35438788aa138f")});
  // var userid = 

  db.collection('users').remove({email: req.params.email}, function(err, user){
    if (err) {
      return res.send(err)
    } 
    res.send()
  })
  // db.collection('users').findOne({email : req.body.email}, function(err, user) {
  //     if ( err ) {
  //       res.send(err)
  //       return
  //     }

  //     delete user.password            

  //     res.status(201).send({
  //       id_token: createToken(user)
  //     });
  // });


});
