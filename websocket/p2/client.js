const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
  // send a message to the server
  socket.send(JSON.stringify({
    type: "hello from client",
    content: [ 3, "4" ]
  }));
});

// receive a message from the server
socket.addEventListener("message", ({ data }) => {
  const packet = JSON.parse(data);

//   switch (packet.type) {
//     case "hello from server":
//       // ...
//       break;
//   }
const text = packet.type;
socket.send(`message recieved from server ${text}`)
});
