from flask import session, request
from flask_socketio import emit, join_room, leave_room
from .. import socketio
import redis
import os
import json
import random

r = redis.from_url(os.environ['REDISCLOUD_URL'])
clients = []

@socketio.on('join', namespace='/game')
def join(data):
    room = data['id']
    clients.append(request.sid)
    join_room(room)
    room_data = json.loads(r.get(room))
    username = session.get("username")
    if(len(room_data["users"].keys()) == 0):
        colour = round(random.random())
    elif(len(room_data["users"].keys()) == 1):
        player1 = list(room_data["users"].keys())[0]
        colour = 0 if bool(room_data["users"][player1]) else 1
    else:
        colour = -1
    room_data["users"][username] = colour
    r.set(room, json.dumps(room_data))
    print(colour)
    emit('setPlayer', {'player': colour}, room=clients[-1])
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

@socketio.on('movedone', namespace='/game')
def movedone(board):
    print("HELLOOOOOOOOOOOOO")
    room = session.get('room')
    room_data = json.loads(r.get(room))
    if len(room_data['boardstates'])>0:
        if room_data['boardstates'][-1] != board['board']:
            room_data['boardstates'].append(board['board'])
            r.set(room, json.dumps(room_data))
    else:
        room_data['boardstates'].append(board['board'])
        r.set(room, json.dumps(room_data))