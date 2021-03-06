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
        console.log(onlineusers);
        for(let i in onlineusers){
            if(i != data["name"]){
                let friend = document.createElement("li");
                friend.appendChild(document.createTextNode(i));
                let btn = document.createElement("button");
                btn.innerHTML = "Challenge!";
                btn.id = "chalBtn";
                btn.onclick = function () {
                    socketg.emit('challenge', {"usert": i});
                };
                friend.appendChild(btn);
                userDiv.appendChild(friend);
            }
        }
    });
}