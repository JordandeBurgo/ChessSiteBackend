var socket;
$(document).ready(function(){
    socket = io.connect();
    console.log(socket);
    socket.on('connect', function() {
        console.log("CONNECTING...")
        socket.emit('join', {});
    });
});
