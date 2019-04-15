/*
var newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => console.log("Error saving todo", e));
*/
/*
let anotherTodo = new Todo({
    text: "Call wife",
    completed: true,
    completedAt: new Date().getTime()
});

anotherTodo.save().then(
    doc => console.log('Saved todo', doc),
    (e) => console.log('Unable to save todo', e)
);
*/
/*
let otherTodo = new Todo({
    text: '   Edit this video    '
});
otherTodo.save().then(doc => console.log('Todo saved', doc),
err => console.log('Unable to save todo', err));
*/

/*
let firstUser = new User({
    email: 'qauzeemyusuff@gmail.com'
});
firstUser.save().then(user => {
    console.log('Saved user', user);
}).catch(err => {
    console.log('Unable to save user', err);
});
*/

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


const app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {

    let todo = new Todo({
        text: request.body.text,
    });

    todo.save()
    .then(doc => response.status(200).send(doc))
    .catch(err => response.status(400).send(err));
});

app.get('/todos', (request, response) => {
    Todo.find()
        .then(docs => {
            response.status(200).send(docs);
        })
        .catch(err => response.status(400).send(err));
});

app.listen(3000, () => console.log('Started on port 3000'));



module.exports = {app};