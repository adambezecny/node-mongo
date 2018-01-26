const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err,database) => {

    assert.equal(err, null);
    console.log('Connected correctly to mongo server');

    const db = database.db("conFusion");

    db.collection("dishes", (err, collection) => {

        assert.equal(err, null);

        collection.insertOne({"name": "Uhtapizza2","description":"Test2"},
            (err, result) => {
                assert.equal(err, null);
                console.log("After Insert:\n");
                console.log(result.ops);

                collection.find({}).toArray((err, docs) => {
                    assert.equal(err, null);

                    console.log("Found:\n");
                    console.log(docs);

                    //database.close();

                    db.dropCollection("dishes", (err, result) => {
                        assert.equal(err, null);
                        database.close();
                        console.log("mongo db closed");
                    });
                });

            }
        );        
        

    });



});