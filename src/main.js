/*
GET /todo
[
    {
        "id": "1",
        "title": "Test",
        "content": "Test content"
    }
]
GET /todo/1
{
    "id": "1",
    "title": "Test",
    "content": "Test content"
}
POST /todo
{
    "title": "Test",
    "content": "Test content"
}
2
DELETE /todo/1
*/
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(JSON.stringify("ok"))
})

let currentId = 0;
const todos = new Map();

app.get('/todo', (request, response) => {
    response.send(JSON.stringify([...todos.values()]))
});

app.get('/todo/:id', (request, response) => {
    response.send(JSON.stringify(todos.get(parseInt(request.params.id))));
});

app.post('/todo', (request, response) => {
    let todo = request.body;
    todo.id = ++currentId;
    todos.set(todo.id, todo);
    response.send(JSON.stringify(todo.id));
});

app.delete('/todo/:id', (request, response) => {
    todos.delete(parseInt(request.params.id))
    response.send(JSON.stringify("ok"));
});

app.listen(8080, () => {
    console.log(`Example app listening on port 8080`)
})