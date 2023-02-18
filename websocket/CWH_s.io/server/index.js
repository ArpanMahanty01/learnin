const io = require("socket.io")(8000, {
    cors: {
        origin: "*",
    }
})

const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined', names=>{ //here user-joined is an event
        console.log("new-user :", names)
        users[socket.id]=names;//the socket id will be stored in the name , so for every socket there would be a unique name
        socket.broadcast.emit('user-joined', names);
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name:users[socket.id]})///////********<-<-<- user or users */
    });
})