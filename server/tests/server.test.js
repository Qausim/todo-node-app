const expect = require('expect');
const request = require('supertest');

/* Mocha and nodemon don't need to be required. */

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {ObjectID} = require('mongodb');

const todos = [
    {
        _id: new ObjectID(),
        text: "Visit friends"
    },
    {
        _id: new ObjectID(),
        text: "Go to mall"
    }
];

beforeEach(done => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => done())
        .catch(err => done(e));
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then(tds => {
                    expect(tds.length).toBe(1);
                    expect(tds[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            });
    });

    it('should not create todo with invalid data', done => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().count()
                    .then(count => {
                        expect(count).toBe(2);
                        done();
                    })
                    .catch(e => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should return all todos', done => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a specified todo', done => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 todo not found', done => {
        let id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('it should return 404 for non-object ids', done => {
        let invalidId = 123;
        request(app)
            .get(`/todos/${invalidId}`)
            .expect(404)
            .end(done);
    });
});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', done => {
        let id = todos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect(res => {
            expect(res.body.todo).toEqual(todos[0]);
        })
        .end(done);
    });

    it('should return 404 if todo not found', done => {

    });

    it('should return 404 if object id invalid', done => {

    });
});