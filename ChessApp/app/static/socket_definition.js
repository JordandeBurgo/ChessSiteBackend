var socket;
$(document).ready(function(){
    socket = io('/game');
    console.log(socket);
    let t = window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
    socket.on('connect', function() {
        console.log("CONNECTING...")
        socket.emit('join', {id: t});
    });
});
