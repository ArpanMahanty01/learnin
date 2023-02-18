const http = require("http");
const WebSocketServer = require("websocket").server
let connection = null;

const httpserver = http.createServer((req,res)=>{

})

const websocket = new WebSocketServer({
    "httpServer": httpserver
})

websocket.on("request", req=>{
    connection= req.accept(null, req.origin)
    connection.on("open", ()=>{
        console.log("open")
    })
    connection.on("message", message => {
        console.log(`Recieved message ${message.utf8Data}`)
    })
} )

httpserver.listen(8080)