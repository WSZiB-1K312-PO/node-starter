const http = require("http");

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

http.ServerResponse.prototype.writeJson = function(code, json) {
    this.setHeader("Content-Type", "application/json");
    this.writeHead(code);
    this.write(JSON.stringify(json));
    this.end();
}

const server = http.createServer((request, response) => {
    console.log(request.method + " " + request.url);
    switch (request.method) {
        case "GET":
            response.writeJson(200, "ok");
            break;
        case "POST":
            break;
        case "DELETE":
            break;
        default:
            response.writeJson(400, "wrong request");
    }
});

server.listen(8080);