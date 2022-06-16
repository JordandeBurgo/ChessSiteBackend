from flask import session
from flask_socketio import emit, join_room, leave_room
from .. import socketio

@socketio.on('join', namespace='/game')
def join(msg):
    room = msg.id
    join_room(room)
    print("SOMEONE JOINED THE ROOM")
    #                              0        1         -1
    #emit whether this player is white or black or spectator
    #also save this to session data ( delete at end of game with session.pop('variable_name') )
    #also save this to room data (probably in a database table?) so that the second player/correct player 
        #can have the other colour and all after get spectator actually can I just use a vaiable? Maybe ask cody
    


@socketio.on('moved', namespace='/game')
def moved(move):
    print("SOMEONE MOVED")
    room = session.get('room')
    print(move['move'])
    #todo: check if the move is legal
    emit('domove', {'move': move['move']}, room=room)