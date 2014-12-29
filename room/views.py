from flask.views import MethodView
from flask import jsonify, session, abort, request
import db.db as db
from utils import slugutils

def room_info(room_id):
    from user.views import user_info
    return {
        'room_id': room_id,
        'name': db.get_room_name(room_id),
        'tax': db.get_room_tax(room_id),
        'tip': db.get_room_tip(room_id),
        'members': [user_info(user) for user in db.get_room_members(room_id)],
        'orders': db.get_room_orders(room_id)
    }

class RoomAPI(MethodView):

    def get(self, room_id):
        if not db.room_exists(room_id):
            abort(401)
        db.join_room(room_id, session['user_id'])
        return jsonify(**room_info(room_id))

    def post(self):
        room_id = slugutils.random_slug()
        db.create_room(room_id)
        if request.json is not None:
            name = request.json.get('name')
            tax = request.json.get('tax', type=float)
            tip = request.json.get('tip', type=float)
            if name is not None:
                db.set_room_name(room_id, name)
            if tax is not None:
                db.set_room_tax(room_id, tax)
            if tip is not None:
                db.set_room_tip(room_id, tip)
        return self.get(room_id)

    def put(self, room_id):
        if not db.room_exists(room_id):
            abort(401)
        db.join_room(room_id, session['user_id'])
        if request.json is not None:
            name = request.json.get('name')
            tax = request.json.get('tax', type=float)
            tip = request.json.get('tip', type=float)
            if name is not None:
                db.set_room_name(room_id, name)
            if tax is not None:
                db.set_room_tax(room_id, tax)
            if tip is not None:
                db.set_room_tip(room_id, tip)
        return self.get(room_id)

api_view = RoomAPI.as_view('room_api')
