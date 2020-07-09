const express = require("express");
const http = require("http");
const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

app.use("/public", express.static("./public"));
app.get("/", (req, res) => {
  res.redirect(302, "/public");
});

const socketIO = require("socket.io");
const io = socketIO(server);
const rooms = [];

io.sockets.on("connection", (socket) => {
  console.log(socket.id + "is connected");

  socket.on("join", (type) => {
    console.log(rooms.includes(type));
    if (rooms.includes(type) === false) {
      rooms.push(type);
    }

    socket.join(type, () => {
      console.log(rooms);
      io.to(type).emit("roomnum", "hello");
    });
  });

  socket.on("leave", (type) => {
    console.log("leave", type);
  });

  socket.on("disconnecting", (socket) => {
    console.log("disconnecting");
  });

  socket.on("update-msg", (type, msg) => {
    console.log("type:" + type);
    console.log("msg:" + msg);
    io.to(type).emit("chat-msg", msg);
  });

  socket.on("room", (type) => {
    console.log(type);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
