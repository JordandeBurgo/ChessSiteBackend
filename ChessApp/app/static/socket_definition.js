var socket;
$(document).ready(function(){
    socket = io.connect('http://' + document.domain + ':' + location.port + '/game');
    socket.on('connect', function() {
        socket.emit('join', {});
    });
});
