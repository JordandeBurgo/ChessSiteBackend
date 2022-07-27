from .. import socketio
import redis
import json
import os
from flask import request
from flask_socketio import emit


r = redis.from_url(os.environ['REDISCLOUD_URL'])

@socketio.on('load', namespace='/onlineusers')
def load(data):
    onlineusers = json.loads(r.get("users"))
    emit('display', {"usernames": onlineusers}, room=request.sid)