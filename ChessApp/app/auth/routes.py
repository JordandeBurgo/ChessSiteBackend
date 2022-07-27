from . import auth
from flask import (Blueprint, flash, g, redirect, render_template, request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash
from urllib.parse import urlparse
import redis
import os
import json

r = redis.from_url(os.environ['REDISCLOUD_URL'])

@auth.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        error = None

        if not email:
            error = 'Email is required.'
        elif not password:
            error = 'Password is required.'
        
        if error is None:
            user_info = {"username": email, "password": generate_password_hash(password)}
            setuser = r.setnx(email, json.dumps(user_info))
            r.setnx("users", json.dumps([]))
            if setuser == 0:
                error = f"User {email} is already registered."
            else:
                redirect(url_for('auth.login'))
        flash(error)
    return render_template('auth/register.html')

@auth.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        error = None
        user = json.loads(r.get(email))
        print(user)
        if user is None:
            error = 'Incorrect email.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()     
            session['username'] = email
            userlist = json.loads(r.get("users"))
            userlist.append(email)
            r.set("users", json.dumps(userlist))
            return redirect(url_for('index'))
        flash(error)
    return render_template('auth/login.html')

@auth.before_app_request
def load_logged_in_user():
    user_id = session.get('username')

    if user_id is None:
        g.user = None
    else:
        g.user = json.loads(r.get(user_id))

@auth.route('/logout')
def logout():
    userlist = json.loads(r.get("users"))
    userlist.remove(session.get('username'))
    r.set("users", json.dumps(userlist))
    session.clear()
    return redirect(url_for('index'))