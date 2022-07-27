var socket;
$(document).ready(function(){
    socket = io('/onlineusers');
    socket.on('connect', function() {
        socket.emit('load', {});
    });
    socket_handle();
});

function socket_handle(){
    socket.on('display', function(data){
        onlineusers = data["usernames"];
        userDiv = document.getElementById("friendlist");
        for(let i in onlineusers){
            let friend = document.createElement("li");
            friend.appendChild(document.createTextNode(i));
            userDiv.appendChild(friend);
        }
    });
}