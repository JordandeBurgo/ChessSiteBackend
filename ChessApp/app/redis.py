import os
from urllib.parse import urlparse
import redis

def get_r():
    print("HELLOX")
    url = urlparse(os.environ.get("REDIS_URL"))
    print("HELLOY ", url)
    r = redis.Redis(host=url.hostname, port=url.port, username=url.username, password=url.password, ssl=True, ssl_cert_reqs=None)
    print("HELLOZ")
    print(r.ping())
    
    return r