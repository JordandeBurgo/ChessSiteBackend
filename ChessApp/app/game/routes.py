from flask import session, redirect, url_for, render_template, request
from . import game
from ..auth.auth import login_required

@game.route('/')
def index():
    return render_template('game/index.html')

@game.route('/room', methods=('GET', 'POST'))
@login_required
def room():
    return render_template('game/room.html', session = session)

@game.route('/game', methods=('GET', 'POST'))
def game():
    if(request.method == 'POST'):
        room = request.form['room']
        session['room'] = room
        return render_template('game/game.html', session=session)
    else:
        if(session.get('username') is not None):
            return render_template('game/game.html', session=session)
    return redirect(url_for('index'))

#game.route('/game')
#def game_instance():
#    if(session.get('username') is not None):
#        #todo: Check whether the user is 1 of the first 2 to join. I.e. one of the 2 players
#        return render_template('game/game.html', session=session)
#    #todo: Otherwise add them in as a specataor... 
#
#    return redirect(url_for('index'))