var socket;
$(document).ready(function(){
    socket = io('/game');
    let t = window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
    socket.on('connect', function() {
        socket.emit('join', {'id': t});
    });
});
