from flask.views import MethodView
from flask import session, jsonify, abort, request
import db.db as db

def user_info(user_id):
    from wallet.views import get_payment_methods
    return {
        'user_id': user_id,
        'name': db.get_user_name(user_id),
        'color': db.get_user_color(user_id),
        'payment': get_payment_methods(user_id)
    }

class UserAPI(MethodView):

    def get(self, user_id):
        if user_id is None:
            user_id = session['user_id']
        if db.user_exists(user_id):
            from wallet.views import get_payment_methods
            return jsonify(**user_info(user_id))
        else:
            abort(401)

    def put(self):
        user_id = session['user_id']
        if request.json is not None:
            name = request.json.get('name')
            color = request.json.get('color')
            if name is not None:
                db.set_user_name(user_id, name)
            if color is not None:
                db.set_user_color(user_id, color)
        return self.get(user_id)

api_view = UserAPI.as_view('user_api')
