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
    username = session.get("username")
    if username is not None:
        room = data['id']
        clients.append(request.sid)
        emit('setUsername', {'username': username}, room=clients[-1])
        join_room(room)
        room_data = json.loads(r.get(room))
        if(username not in list(room_data["users"].keys())):
            if(len(room_data["users"].keys()) == 0):
                colour = round(random.random())
                room_data["connectedPlayers"].append(username)
                emit('playerConnected', {'names': {'player1': [username, colour], 'player2': None}}, room=room)
            elif(len(room_data["users"].keys()) == 1):
                player1 = list(room_data["users"].keys())[0]
                colour = 0 if bool(room_data["users"][player1]) else 1
                room_data["connectedPlayers"].append(username)
                emit('playerConnected', {'names': {'player1': [player1, room_data["users"][player1]], 'player2': [username, colour]}}, room=room)
            else:
                player1 = list(room_data["users"].keys())[0]
                player2 = list(room_data["users"].keys())[1]
                emit('playerConnected', {'names': {'player1': [player1, room_data["users"][player1]], 'player2': [player2, room_data["users"][player1]]}}, room=clients[-1])
                colour = -1
            room_data["users"][username] = colour
            
            r.set(room, json.dumps(room_data))
            print(colour)
        else:
            colour = room_data["users"][username]
            if colour != -1:
                room_data["connectedPlayers"].append(username)
                r.set(room, json.dumps(room_data))
        emit('setPlayer', {'player': colour}, room=clients[-1])
        emit('setBoard', {'fen': room_data["boardstates"][-1]}, room=clients[-1])
        print("SOMEONE JOINED THE ROOM")

@socketio.on('moved', namespace='/game')
def moved(move):
    print("SOMEONE MOVED")
    room = session.get('room')
    print(move['move'])
    #todo: check if the move is legal
    emit('domove', {'move': move['move']}, room=room)

@socketio.on('movedone', namespace='/game')
def movedone(board):
    room = session.get('room')
    room_data = json.loads(r.get(room))
    if room_data['boardstates'][-1] != board['board']:
        room_data['boardstates'].append(board['board'])
        r.set(room, json.dumps(room_data))

@socketio.on('disconnect', namespace='/game')
def disconnected():
    print("DISCONNECTED")
    username = session.get("username")
    room = session.get('room')
    room_data = json.loads(r.get(room))
    colour = room_data["users"][username]
    if colour != -1:
        room_data["connectedPlayers"].remove(username)
        r.set(room, json.dumps(room_data))
    if len(room_data["connectedPlayers"]) == 0:
        emit('close', {}, room=room)
        r.delete(room)
