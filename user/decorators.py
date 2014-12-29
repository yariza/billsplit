from functools import wraps
from flask import session
from utils import slugutils
import db.db as db

def user_id_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            user_id = slugutils.random_slug()
            session['user_id'] = user_id
            db.create_user(user_id)
        return f(*args, **kwargs)
    return decorated_function
