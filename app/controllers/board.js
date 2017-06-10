var config = require('../config');
var mongoClient = require('mongodb').MongoClient;
//var bcrypt = require("bcrypt-nodejs");
var jwt = require('express-jwt');
var co = require('co');

var model = require('../../models/model');

var db;
var collection;
mongoClient.connect(config.connectionString, function (err, database) {
    if (err)
        console.log(err);
    else {
        db = database;
        console.log("db connected...");
    }
})


//카페 리스트
// exports.news_list = function (req, res) {
//     console.log("ok news_list " + new Date());
//     res.send("ok news_list " + new Date());
// };

// exports.news_insert = function (req, res) {
//     db.collection('votes').find({}, {
//         limit: 1,
//         fields: {
//             sid: 1
//         },
//         sort: {
//             sid: -1
//         }
//     }).toArray(function (err, docs) {
//         var _next = docs.length ? docs[0].sid + 1 : 1;
//         // doc.sid = _next;
//         req.body.sid = _next;
//         db.collection('votes').insert(req.body, function (err, result) {
//             if (err) {
//                 res.send(err)
//                 return
//             }
//             res.send();
//         });
//     });
// };


exports.list = function(req, res) {

    // db.collection('votes').distinct('issue_id', {'email': req.params.email}, {$sort : {created : -1}}, function (err, issue_ids) {
    //     console.log(issue_ids)
    //     if (err) res.status(500).send(err)
    //     db.collection('issues').find({
    //         $query: {sid: {$in: issue_ids}},
    //         $orderby: {created: -1}
    //     }).toArray(function (err, docs) {
    //         res.send(docs)
    //     })
    // });
    // db.collection('news').find({
    //     // $query: {sid: {$in: issue_ids}},
    //     // $orderby: {created: -1}
    // }).toArray(function (err, docs) {
    //     res.send(docs)
    // })

    // co(function*() {
    //     var args;
    //     if(req.query.articleType){
    //         // args = {
    //         //     articleType: { '$regex': req.query.articleType },
    //         //     $or: [
    //         //         {
    //         //             content: { '$regex': req.query.searchText }
    //         //         },
    //         //         {
    //         //             title: { '$regex': req.query.searchText }
    //         //         }
    //         //     ],
    //         //     // $or: [
    //         //     //     {
    //         //     //         share: true
    //         //     //     }
    //         //     // ]
    //         // }
    //
    //         args = {
    //         { $or: [ { articleType: { '$regex': req.query.articleType } }, {share: true}] },
    //             $or: [
    //                 {
    //                     content: { '$regex': req.query.searchText }
    //                 },
    //                 {
    //                     title: { '$regex': req.query.searchText }
    //                 }
    //             ]
    //         }
    //
    //
    //     }
    //     // console.log("ARGS --- ", args);
    //     var result= yield model.list(Number(req.query.page), Number(req.query.rows), args, db.collection('news'));
    //     res.status(200).send(result);
    // }).catch(function(err) {
    //     console.log(err);
    //     console.log(err.stack);
    //     res.status(400).end();
    // });

    console.log(req.query.articleType)

    if (req.query.articleType==='notice') {
        db.collection('news').find({ $or: [ {'articleType' : req.query.articleType}, { share: true } ] })
            .sort({date: -1}).skip(req.query.rows * (req.query.page-1)).limit(Number(req.query.rows)).toArray(function (err, docs) {
            res.send(docs);
        })
    } else {
        db.collection('news').find({ $or: [ {'articleType' : req.query.articleType} ] })
            .sort({date: -1}).skip(req.query.rows * (req.query.page-1)).limit(Number(req.query.rows)).toArray(function (err, docs) {
            res.send(docs);
        })
    }

}

exports.view = function (req, res) {
    co(function*() {
        var args = { sid : Number(req.params.sid)};
        var result= yield model.findDoc(  args , db.collection('news'));

        if(!result)
            res.status(404).end('Can not found.' );
        else{
            // var coupon_args ={ sid : result[0].ofCoupon };
            // var coupon = yield model.findDoc(coupon_args, db.collection('coupons'));
            // result[0].ofCoupon = coupon;
            res.status(200).send(result);
        }
    }).catch(function(err) {
        console.log(err);
        console.log(err.stack);
        res.status(400).end();
    });
}

exports.update =function (req,res){
    co(function*(){
        var args= {sid : Number(req.params.sid)};
        delete(req.body._id);
        // console.log("update:", Number(req.params.sid), req.body);
        var result = yield model.updateDoc(args, req.body, db.collection('news'));
        if(result.n ===1)
            res.status(200).send(result);
        else res.status(400).send(result);
    })
        .catch(function(err) {
            console.log(err);
            console.log(err.stack);
            res.status(400).end();
        });
};
exports.create = function(req, res) {
    // db.collection('board').insert(req.body, function (err, result) {
    //     if (err) {
    //         res.send(err)
    //         return
    //     }
    //     res.send();
    // });
    //console.log(req);
    co(function*(){
        var result= yield model.insertDoc(req.body, db.collection('news'), 'newsid');
        res.status(200).send()
    }).catch(function(err){
        console.log(err);
        console.log(err.stack);
        res.status(500).end();
    });

}

exports.delete = function (req, res) {
    // var args = {sid : Number(req.params.sid)};
    co(function*(){
        var args = {sid : Number(req.params.sid)};
        var result = yield model.deleteDoc(args, db.collection('news'));
        if(result.n ===1)
            res.status(200).send(result);
        else res.status(400).send(result);
    })
        .catch(function(err) {
            console.log(err);
            console.log(err.stack);
            res.status(400).end();
        });
}

// db.getCollection('votes').insertMany( [
//     {issue_id:1020, age:'21~', gender:'male', created: new Date(), 'choice':'yes'},
//     {issue_id:1020, age:'21~', gender:'male', created: new Date(), 'choice':'yes'},
//     {issue_id:1020, age:'21~', gender:'male', created: new Date(), 'choice':'yes'}
// ] );
