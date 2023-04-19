const socket = new WebSocket('ws://localhost:8080');

// listen for messages
socket.onmessage = ({data}) => {
    console.log('Message from server', data);
}

document.querySelector('button').onclick = () => {
    socket.send(JSON.stringify({data:['b','c','e'], origin:location.origin}));
}