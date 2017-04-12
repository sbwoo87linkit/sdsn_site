var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./app/config'),
    quoter  = require('./quoter'),
    multer  = require('multer')

var mongoClient = require('mongodb').MongoClient
var db
var collection

mongoClient.connect(config.connectionString, function (err, database) {
    if (err)
        console.log(err)
    else {
        db = database;
        collection = db.collection('issues');
    }
})


var utils = require('./utils');
console.log("typeof utils.insertDocument >>>  ", typeof utils.insertDocument);

var app = module.exports = express.Router();



var jwtCheck = jwt({
  secret: config.secret
});


// var upload = multer({ dest: './uploads' });
// app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));


app.use('/api', jwtCheck);

// app.get('/api/issues', function (req, res) {
//     collection.find({is_main_issue: true}).toArray( function (err, docs) {
//         if (err) res.status(500).send(err)
//         res.status(200).send(docs)
//     })
// })


app.get('/api/issues', function (req, res) {

    collection.find({}).toArray( function (err, docs) {
        if (err) res.status(500).send(err)
        res.status(200).send(docs)
    })



    // collection.find({ $query: {is_main_issue: true}, $orderby: { post_date : -1 } }).toArray( function (err, docs) {
    //     if (err) res.status(500).send(err)
    //     res.status(200).send(docs)
    // })

})


// { $query: {is_main_issue: true}, $orderby: { age : -1 } }

// app.get('/api/history_issues', function (req, res) {
//     collection.find({ $query: {}, $orderby: { post_date : -1 } }).toArray( function (err, docs) {
//         if (err) res.status(500).send(err)
//         res.status(200).send(docs)
//     })
// })

app.get('/api/history_issue/:sid', function (req, res) {
    collection.find({ $query: {}, $orderby: { post_date : -1 } }).toArray( function (err, docs) {

        if (err) res.status(500).send(err)

        var sid = Number(req.params.sid)
        // sid = 18

        var resultArray = []
        while(true) {
            var resultObject = docs.filter(function(obj){
                return obj.sid === sid
            })[0]

            if (resultObject) resultArray.push(resultObject)

            if (resultObject === undefined || resultObject.parent_id === undefined) {
                break
            }
            sid = resultObject.parent_id
        }

        resultArray.reverse()

        sid = Number(req.params.sid)


        // var resultArray=[];
        function getDescendants (sid, callback) {

            var resultObjects = docs.filter(function(obj){
                return obj.parent_id === sid
            })

            for (var i=0; i < resultObjects.length; i++) {
                resultArray.push(resultObjects[i])
            }

            if (resultObjects.length === 0) {
                return resultArray
                // if (typeof callback === "function") {
                //     callback ()
                // }
            }
            if (resultObjects.length > 0) {
                for (var i=0; i < resultObjects.length; i++) {
                    if (i == resultObjects.length-1) {
                        return getDescendants(resultObjects[i].sid) // is last
                    } else {
                        return getDescendants(resultObjects[i].sid) // not last
                    }
                }
            }
        }
        var resultDescendants = getDescendants (sid)

        res.status(200).send(resultDescendants)
    })
})



app.get('/api/issue/:sid', function (req, res) {

    mongoClient.connect(config.connectionString, function (err, database) {
        if (err)
            console.log(err)
        else {
            db = database;
            collection = db.collection('issues');

            collection.find({sid: Number(req.params.sid)}).toArray( function (err, docs) {
                if (err) res.status(500).send(err)
                // res.status(200).send(docs)
                res.send(docs)
            })


        }
    })

})


app.delete('/api/issue/:sid', function (req, res) {

    mongoClient.connect(config.connectionString, function (err, database) {
        if (err)
            console.log(err)
        else {
            db = database;
            collection = db.collection('issues');


            collection.remove({sid: Number(req.params.sid)}, function (err, result) {
                if (err) res.status(500).send(err)
                // res.status(200).send(docs)
                res.send()
            })
        }
    })

})

app.put('/api/issue/:sid', function (req, res) {

    mongoClient.connect(config.connectionString, function (err, database) {
        if (err)
            console.log(err)
        else {
            db = database;
            collection = db.collection('issues');

            delete req.body._id;
            collection.updateOne({sid: Number(req.params.sid)}, { $set: req.body }, function (err, result) {
                if (err) res.status(500).send(err)
                // res.status(200).send(docs)
                res.send()
            })


        }
    })

})




app.post('/api/issues', function(req, res) {
    utils.insertDocument(
        req.body,
        collection
    );

    res.end()
    // TODO : How to make custom callback ?
});


