import os

from flask import Flask, session, request
from flask_socketio import emit, SocketIO
from flask_session import Session
import json
import redis
import uuid

r = redis.from_url(os.environ['REDISCLOUD_URL'])
socketio = SocketIO(cors_allowed_origins="*", logger=True, engineio_logger=True)

def create_app(test_config=None):
    app = Flask(__name__)
    app.debug = True
    app.config['SECRET_KEY'] = 'secret'
    app.config['SESSION_TYPE'] = 'filesystem'

    Session(app)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    from .game import game as game_blueprint
    app.register_blueprint(game_blueprint)
    from .user import user as users_blueprint
    app.register_blueprint(users_blueprint)

    app.add_url_rule('/', endpoint='index')

    socketio.init_app(app)

    return app

@socketio.on('my event')
def test_connect(data):
    print("Client Connected")
    if session.get("username") is not None:
        userlist = json.loads(r.get("users"))
        userlist[session.get('username')] = request.sid
        r.set("users", json.dumps(userlist))
        userchals = json.loads(r.get(session.get("username")))
        emit('loadnotis', {"chals": userchals["challenges"]}, room=request.sid)

@socketio.on('disconnect')
def test_disconnect():
    print("Client Disconnected")
    if session.get("username") is not None:
        userlist = json.loads(r.get("users"))
        del userlist[session.get('username')]
        r.set("users", json.dumps(userlist))

@socketio.on('challenge')
def challenge(data):
    userlist = json.loads(r.get("users"))
    sidsend = userlist[data["usert"]]
    userf = session.get("username")
    user = json.loads(r.get(data["usert"]))
    if userf not in user['challenges']:
        user['challenges'].append(userf)
        r.set(data["usert"], json.dumps(user))
    emit('challenged', {"challenger": userf}, room=sidsend)

@socketio.on('challengeA')
def challengeAccepted(data):
    roomname = uuid.uuid4().hex[:6]
    print(roomname)

@socketio.on('challengeD')
def challengeDecline(data):
    usert = session.get("username")
    userf = data["userf"]
    user = json.loads(r.get(usert))
    if userf in user["challenges"]:
        user["challenges"].remove(userf)
        r.set(usert, json.dumps(user))