from flask import session, redirect, url_for, render_template, request
from . import game
from ..auth.auth import login_required
from werkzeug.exceptions import BadRequest
import redis
import os
import json

r = redis.from_url(os.environ['REDISCLOUD_URL'])

@game.route('/')
def index():
    return render_template('game/index.html')

@game.route('/room', methods=('GET', 'POST'))
@login_required
def room():
    return render_template('game/room.html', session = session)

@game.route('/game', methods=('GET', 'POST'))
def games():
    if(request.method == 'POST'):
        room = request.form['room']
        room_data = {"users": {}, "boardstates": ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"], "connectedPlayers": [], "losers": []}
        r.setnx(room, json.dumps(room_data))
        return redirect(url_for('game.game_instance', roomname=room))
    else:
        if(session.get('username') is not None):
            return redirect(url_for('game.game_instance', roomname=room))
    return redirect(url_for('index'))

@game.route('/game/<roomname>')
def game_instance(roomname):
    session['room'] = roomname
    username = session.get('username')
    user_info = json.loads(r.get(username))
    user_info["room"] = [roomname]
    r.set(username, json.dumps(user_info))
    if(session.get('username') is not None):
        #todo: Check whether the user is 1 of the first 2 to join. I.e. one of the 2 players
        return render_template('game/game.html', session=session)
    #todo: Otherwise add them in as a specataor... 
    return redirect(url_for('index'))