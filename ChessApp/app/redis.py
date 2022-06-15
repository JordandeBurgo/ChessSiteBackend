import os
from urllib.parse import urlparse
import redis

def get_r():
    url = urlparse(os.environ.get("REDIS_URL"))
    r = redis.Redis(host=url.hostname, port=url.port, username=url.username, password=url.password, ssl=True, ssl_cert_reqs=None)
    
    r.ping() 
    
    return r