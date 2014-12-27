from flask import Flask, render_template
from gevent.wsgi import WSGIServer
from werkzeug.serving import run_with_reloader
from werkzeug.debug import DebuggedApplication
from redissessioninterface import RedisSessionInterface
from gevent import monkey
monkey.patch_all()

app = Flask(__name__)

app.session_interface = RedisSessionInterface()

app.debug = True
app.use_debugger = True

@app.route("/")
def index():
        return "Hello, World!"

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@run_with_reloader
def runServer():
    http_server = WSGIServer(('', 5000), DebuggedApplication(app))
    http_server.serve_forever()

if __name__ == "__main__":
    runServer()
