// /server.js
const app = require("express")();
var socket = require("socket.io");

// App setup
var server = app.listen(8000, () => {
  console.log("listening to request on port 8000");
});

// User data
let users = [];

// Socket setup
var io = socket(server);

let connectCounter = 0;

io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  socket.on("enterRoom", function(room, isAdmin) {
    socket.join(room);
    console.log(io.nsps["/"].adapter.rooms[room]);
    users.push({
      userId: socket.id,
      value: null,
      room: parseInt(room),
      role: isAdmin ? "teacher" : "student"
    });
  });

  connectCounter++;
  console.log("Active connected users:", connectCounter);

  socket.on("disconnect", function() {
    connectCounter--;
    console.log("Active connected users: ", connectCounter);
    users = users.filter(user => user.userId !== socket.id);
  });

  socket.on("slider-value", data => {
    users.map(user =>
      user.userId === data.uid ? (user.value = data.value) : ""
    );
    console.log(users);
  });

  socket.on("get-users", function() {
    console.log(users);
  });

  socket.on("createRoom", data => {
    socket.join(data);
    console.log(io.sockets);
    io.emit("createdRoom", data);
    console.log(data);
  });

  socket.on("getRoomSnapshot", data => {
    const usersInRoom = users.filter(user => {
      return user.room == data;
    });
    io.emit("usersInRoom", usersInRoom);
    console.log(usersInRoom);
  });
});
