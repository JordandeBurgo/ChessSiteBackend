var socket;
$(document).ready(function(){
    socket = io('/game/SpaceRoom');
    console.log(socket);
    socket.on('connect', function() {
        console.log("CONNECTING...")
        socket.emit('join', {});
    });
});
