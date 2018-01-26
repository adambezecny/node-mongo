const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, (err,database) => {

    assert.equal(err, null);
    const db = database.db("conFusion");

    console.log('Connected correctly to mongo server');

    dboper.insertDocuments(db, {name: "Vadonut", description: "Test"}, "dishes", (result) => {
        console.log("Inserted Document:\n", result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, {name: "Vadonut"}, {description: "Updated Test"}, "dishes", (result) => {
                console.log("Updated Document:\n", result.result);


                dboper.findDocuments(db, "dishes", (docs) => {
                    console.log("Updated Documents:\n", docs);
                    //db.dropCollection("dishes", (result) => {
                    //    console.log("Dropped collection", result);
                    //    database.close();
                    //});
                    database.close();
                });
            });
        });
    });
});