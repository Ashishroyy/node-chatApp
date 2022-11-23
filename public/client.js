const socket = io()
let name;
let textarea = document.querySelector('#textarea');
let chatArea = document.querySelector('.chat-section');

do{
    name = prompt('enter your username: ')
}while(!name)

textarea.addEventListener('keyup', (event)=>{
    if(event.key === 'Enter'){
        sendMessage(event.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim() 
    }
    // append
    appendMessage(msg, 'outgoing')
    textarea.value = '';
    scrollToBottom()
// send to server
  socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let maindiv = document.createElement('div')
    let className = type
    maindiv.classList.add(className, 'msg')

    let markup = `
    <h1>${msg.user}</h1>
    <p>${msg.message}</p>
    `
    maindiv.innerHTML = markup
    chatArea.appendChild(maindiv)
}
// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight
}

 