const express = require('express');
const app = express();
const server = require("http").Server(app);
const {v4: uniqueRoomID} = require("uuid");
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public/'));
const io = require("socket.io")(server);
const {ExpressPeerServer}= require("peer");
const peerServer = ExpressPeerServer(server,{debug:true});
app.use("/peerjs", peerServer);


app.get("/TeleCode", (req,res)=>{ 
    res.redirect(`/${uniqueRoomID()}`)
})

app.get("/:roomID", (req,res)=>{
    res.render("mainpage", {roomID: req.params.roomID});
});

const users = {};

io.on('connection', socket=>{
    socket.on('newUser', (roomID, userID)=>{
        socket.join(roomID);
        socket.to(roomID).broadcost.emit("user-connected", userID);
    });
});

server.listen(8000)