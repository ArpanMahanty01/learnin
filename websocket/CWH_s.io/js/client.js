const socket = io("http://localhost:8000")

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.querySelector('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value= '';
})

const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names)

socket.on('user-joined', names=>{
    append(`${names} joined the chat`, 'right')
})

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`)
})
