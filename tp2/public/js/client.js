let myMedia;
const socket = io("http://localhost:8000/TeleCode");

import {Peer} from 'peer';

var peer = new Peer (undefined, {
    path: "/peerjs",
    host: "http://localhost:8000/TeleCode",
    port: "8000",
});

let init = async()=>{
    myMedia= await navigator.mediaDevices.getUserMedia({video:true, audio:true})
    document.getElementById('user-1').srcObject = myMedia;
    peer.on("call", (call)=>{
        call.answer(myMedia);
        call.on("stream",(peerMedia)=>{
            document.getElementById('user-2').srcObject = peerMedia;
        });
    });
};
init();
