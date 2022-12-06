import express from "express";
import http from "http";
import { Server } from "socket.io";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app)
const io = new Server(server);

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

server.listen(3000, () => {
    console.log("Listening on port 3000");
});
