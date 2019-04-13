const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    /*
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID("5cb0c96391f25302524e2fa7")
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then(result => console.log(result))
    .catch(err => console.log(err));
    */

    db.collection('Users').findOneAndUpdate({
        name: 'Olawumi Yusuff'
    }, {
        $set: {
            name: 'Qausim Yusuff'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(result => console.log(result))
    .catch(err => console.log(err));




    db.close();
});