// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

/*
let id = new ObjectID();
console.log(id);
*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        console.log('Unable to connect to MongoDB server');
        return;
    }
    console.log('Connected to MongoDB server.');

    /*
    db.collection('Todos').insertOne({
        text: "Something to do",
        completed: false
    }, (err, result) => {
        if (err) {
            console.log('Unable to create todo', err);
            return;
        }
        console.log(JSON.stringify(result.ops, undefined, 4));
    });
    */
   /*
    db.collection('Users').insertOne({
        name: 'Olawumi Yusuff',
        age: 28,
        location: "Lagos, Nigeria"
    }, (err, result) => {
        if (err) {
            console.log('Unable to create user', err);
            return;
        }
        // console.log(JSON.stringify(result.ops, undefined, 4));
        console.log(result.ops[0]._id.getTimestamp());
    });
    */

    db.close();
});