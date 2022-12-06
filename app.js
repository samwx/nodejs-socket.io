const express = require("express");
const app = express();
const path = require("path");

const http = require("http").createServer(app);
const io = require("socket.io")(http);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

let users = [];

io.on("connection", (socket) => {
    console.log(`User connected with id ${socket.id}`);
    users = users.concat(socket.id);

    console.log(`Connected users: ${users}`);

    socket.on("clientMessage", (msgContent) => {
        socket.emit("recebeuMsg", "Recebeu msg");

        socket.broadcast.emit("groupMessage", msgContent);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

http.listen(3000, () => {
    console.log("Listening on port 3000");
});
