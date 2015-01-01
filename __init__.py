from flask import Flask, render_template, session, g
app = Flask(__name__)

app.secret_key = '\xab\xfbCzj\x8db\xaf\xfcw6\x88\xa6\xefO\xc6\xce\\\xdf\x9b\xa4>3\x10'

app.debug = True
app.use_debugger = True

import db.db as db
from gevent import monkey
monkey.patch_all()

@app.before_request
def get_redis():
    """ Get the Redis client."""
    from redis import Redis
    g.redis = Redis()

from user.decorators import user_id_required

"""
Views
"""

""" Home """
@app.route("/")
@user_id_required
def home():
    return render_template('home.html')

""" Room """
@app.route("/room/<room_id>")
@user_id_required
def room(room_id):
    return render_template('room.html')

"""
API
"""

""" Wallet """
from wallet.views import api_view as wallet_view
wallet_view_wrapped = user_id_required(wallet_view)
app.add_url_rule('/api/wallet/',
                view_func=wallet_view_wrapped,
                methods=['GET', 'PUT'])

""" User Settings """
from user.views import api_view as user_view
user_view_wrapped = user_id_required(user_view)
app.add_url_rule('/api/user/',
                defaults={'user_id': None},
                view_func=user_view_wrapped,
                methods=['GET'])
app.add_url_rule('/api/user/',
                view_func=user_view_wrapped,
                methods=['PUT'])
app.add_url_rule('/api/user/<user_id>',
                view_func=user_view_wrapped,
                methods=['GET'])

""" Room """
from room.views import api_view as room_view
room_view_wrapped = user_id_required(room_view)
app.add_url_rule('/api/room/<room_id>',
                view_func=room_view_wrapped,
                methods=['GET'])
app.add_url_rule('/api/room/',
                view_func=room_view_wrapped,
                methods=['POST'])
app.add_url_rule('/api/room/<room_id>',
                view_func=room_view_wrapped,
                methods=['PUT'])

""" Order """
from order.views import api_view as order_view
order_view_wrapped = user_id_required(order_view)
app.add_url_rule('/api/room/<room_id>/order/<order_id>',
                view_func=order_view_wrapped,
                methods=['GET', 'PUT', 'DELETE', 'POST'])
app.add_url_rule('/api/room/<room_id>/order/',
                defaults={'order_id': None},
                view_func=order_view_wrapped,
                methods=['POST'])

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

from gevent.wsgi import WSGIServer
from werkzeug.serving import run_with_reloader
from werkzeug.debug import DebuggedApplication

@run_with_reloader
def runServer():
    http_server = WSGIServer(('', 5000), DebuggedApplication(app))
    http_server.serve_forever()

if __name__ == "__main__":
    runServer()
