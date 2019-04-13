const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        console.log('Unable to connect to the database');
        return;
    }
    console.log('Connection to MongoDB server successful');

    // delete many
    db.collection('Todos').deleteMany({
        text: 'Eat lunch'
    }).then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    // delete one
    // db.collection('Todos').deleteOne({text: "Something to do"})
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err));

    // delete one and return it
    db.collection('Todos').findOneAndDelete({text: "Something to do"})
        .then(result => console.log(result))
        .catch(err => console.log(err));




    db.close();
});