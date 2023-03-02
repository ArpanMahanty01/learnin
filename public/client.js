const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})
import CodeMirror from "../node_modules/codemirror";
import * as Y from '../node_modules/yjs';
import { SocketIOProvider } from "../node_modules/y-socket.io";
import { CodeMirrorBinding } from "../node_modules/y-codemirror";
import '../node_modules/codemirror/mode/javascript/javascript.js'


const form = document.getElementById('messageBox');
const messageInput = document.getElementById('message');
const messagePanel = document.querySelector(".messagePanel")
const codeEditor = document.getElementById('editor')

const myVideo = document.createElement('video')
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })
  
socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
    const ydoc = new Y.Doc()
  const provider = new SocketIOProvider (
    '/',
    ROOM_ID,
    ydoc
  )
  const ytext = ydoc.getText('codemirror')
  document.body.insertBefore(codeEditor,null)
  const editor = CodeMirror(codeEditor,{
    mode: 'javascript',
    lineNumbers:true
  })
const binding = new CodeMirrorBinding(ytext, editor,provider.awareness)
})
})
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

socket.on('recieveMessage',(data)=>{
  add(`${data.from}: ${data.message}`,'left')
})


myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const message = messageInput.value;
  add(`You: ${message}`,'right');
  socket.emit('sentMessage',message);
  messageInput.value = "";
})

const add = (message,position)=>{
  const box = document.createElement("div");
  box.innerHTML = message;
  box.classList.add('message');
  box.classList.add(position);
  messagePanel.append(box); 
}

