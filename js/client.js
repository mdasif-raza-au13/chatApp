const socket = io('http://localhost:8000');

const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.getElementById('container');


const names = prompt('Enter your name to join')
socket.emit('new-user-joined', names);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', name => {
    append(`${name} left the chat`, 'left');
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}