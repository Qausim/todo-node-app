const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

const {ObjectID} = require('mongodb');


// Todo.remove({}).then(res => console.log(res));

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove("5cb4ec1714c4714514b340fe")
    .then(todo => console.log(todo));