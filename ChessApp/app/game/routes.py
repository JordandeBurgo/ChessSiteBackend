from flask import session, redirect, url_for, render_template, request
from . import game
from ..auth.auth import login_required
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
        session['room'] = room
        room_data = {"users": {}, "boardstates": []}
        r.setnx(room, json.dumps(room_data))
        return redirect(url_for('game.game_instance', roomname=room))
    else:
        if(session.get('username') is not None):
            return redirect(url_for('game.game_instance', roomname=room))
    return redirect(url_for('index'))

@game.route('/game/<roomname>')
def game_instance(roomname):
    if(session.get('username') is not None):
        #todo: Check whether the user is 1 of the first 2 to join. I.e. one of the 2 players
        return render_template('game/game.html', session=session)
    #todo: Otherwise add them in as a specataor... 

    return redirect(url_for('index'))