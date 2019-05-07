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
  users.push({
    userId: socket.id,
    value: null
  });
  connectCounter++;
  console.log(connectCounter);

  socket.on("disconnect", function() {
    connectCounter--;
    console.log(connectCounter);
    users = users.filter(user => user.userId !== socket.id);
  });

  socket.on("change-value", data => {
    users.push({
      userId: data.uid,
      value: data.value
    });
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
});
