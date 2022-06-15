var socket;
$(document).ready(function(){
    socket = io.connect();
    socket.on('connect', function() {
        socket.emit('join', {});
    });
});
