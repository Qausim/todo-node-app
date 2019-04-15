const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

let id = "5cb4595e06f951083863a61d";

Todo.find({
    _id: id
})
.then(todos => console.log('Todos', todos))
.catch(e => console.log(e));

Todo.findOne({
    _id: id
})
.then(todo => console.log('Todo', todo));

Todo.findById(id)
.then(todo => console.log(todo));