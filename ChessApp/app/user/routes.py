from . import user
from flask import session, redirect, url_for, render_template, request
from ..auth.auth import login_required

@user.route('/onlineusers')
@login_required
def onlineusers():
    return render_template('user/onlineusers.html', session = session)