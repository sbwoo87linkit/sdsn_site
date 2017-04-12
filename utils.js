/**
 * Created by mac on 29/10/2016.
 */

// tools.js
// ========
module.exports = {
    insertDocument: function (doc, collection) {
        collection.find({}, {
            limit: 1,
            fields: {
                sid: 1
            },
            sort: {
                sid: -1
            }
        }).toArray(function (err, docs) {
            var _next = docs.length ? docs[0].sid + 1 : 1;
            doc.sid = _next;
            collection.insert(doc, function (err, result) {
                if (err && err.message.indexOf('11000') > -1) {
                    //try again
                    insertDocument(doc, collection);
                }
            });
        });
    },
    bar: function () {
        // whatever
    }
};


// function insertDocument(doc, collection) {
//     collection.find({}, {
//         limit: 1,
//         fields: {
//             sid: 1
//         },
//         sort: {
//             sid: -1
//         }
//     }).toArray(function (err, docs) {
//         var _next = docs.length ? docs[0].sid + 1 : 1;
//         doc.sid = _next;
//         collection.insert(doc, function (err, result) {
//             if (err && err.message.indexOf('11000') > -1) {
//                 //try again
//                 insertDocument(doc, collection);
//             }
//         });
//     });
// }
