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
const dotenv = require('dotenv');
dotenv.config();
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');


let port = process.env.PORT || 3000;

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
        .then(todos => {
            response.status(200).send({todos});
        })
        .catch(err => response.status(400).send(err));
});

// GET /todos/id
app.get('/todos/:id', (request, response) => {
    let id = request.params.id;
    
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
        return;
    }

    Todo.findById(id)
        .then(todo => {
            if (!todo) {
                response.status(404).send();
                return;
            }
            response.status(200).send({todo});
        })
        .catch(e => response.status(404).send(e));
});

app.delete('/todos/:id', (request, response) => {
    let id = request.params.id;
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
        return;
    }
    Todo.findByIdAndRemove(id)
        .then(todo => {
            if (!todo) {
                return response.status(404).send();
            }
            response.status(200).send({todo});
        })
        .catch(e => {
            response.status(400).send();
        });
});

app.listen(port, () => console.log(`Started on port ${port}`));



module.exports = {app};