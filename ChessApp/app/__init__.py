import os
from flask import Flask, session
from flask_socketio import SocketIO
from flask_session import Session
from flask_cors import CORS

socketio = SocketIO(cors_allowed_origins="*", async_mode='gevent')

def create_app(test_config=None):
    app = Flask(__name__)
    app.debug = True
    app.config['SECRET_KEY'] = 'secret'
    app.config['SESSION_TYPE'] = 'filesystem'
    CORS(app)

    Session(app)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    from .game import game as game_blueprint
    app.register_blueprint(game_blueprint)

    app.add_url_rule('/', endpoint='index')

    socketio.init_app(app)

    return app