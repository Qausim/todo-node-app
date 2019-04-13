const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        console.log('Unable to connect to database', error);
        return;
    }
    console.log('Connected to MongoDB server');

    // to array returns a promise
    /*
    db.collection('Todos').find({_id: new ObjectID("5cb0c96391f25302524e2fa7")}).toArray()
        .then(docs => {
            console.log('Todos')
            console.log(JSON.stringify(docs, undefined, 4));
        }).catch(error => {
            console.log('Unable to fetch todos', error);
        });
        */
        
    db.collection('Todos').find().count().then(count => {
        console.log(`Todos count: ${count}`);
    }).catch(err => {
        console.log('Unable to fetch todos', err);
    });
    
   /*
   db.collection('Todos').find({
       completed: false,
       text: 'Walk the cat'
   }).toArray()
    .then(todos => console.log(todos))
    .catch(err => console.log(error));
    */

    db.close();
});