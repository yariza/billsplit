from flask.views import MethodView
from flask import jsonify, session, abort, request
import db.db as db
from utils import slugutils

def order_info(order_id):
    from user.views import user_info
    return {
        'order_id': order_id,
        'name': db.get_order_name(order_id),
        'price': db.get_order_price(order_id),
        'members': [user_info(user) for user in db.get_order_members(order_id)]
    }

class OrderAPI(MethodView):

    def get(self, room_id, order_id):
        if not db.room_exists(room_id):
            abort(401)
        if not db.order_exists(order_id):
            abort(401)
        return jsonify(**order_info(order_id))

    def put(self, room_id, order_id):
        if not db.room_exists(room_id):
            abort(401)
        if not db.order_exists(order_id):
            abort(401)
        if request.json is not None:
            name = request.json.get('name')
            price = request.json.get('price')
            if name is not None:
                db.set_order_name(order_id, name)
            if price is not None:
                db.set_order_price(order_id, price)
        return self.get(room_id, order_id)

    def delete(self, room_id, order_id):
        if not db.room_exists(room_id):
            abort(401)
        if not db.order_exists(order_id):
            return self.get(room_id, order_id)
        db.remove_room_order(room_id, order_id)
        return self.get(room_id, order_id)

    def post(self, room_id, order_id):
        if not db.room_exists(room_id):
            abort(401)
        user_id = session['user_id']
        if order_id is None:
            order_id = slugutils.random_slug()
            db.create_order(order_id, user_id)
            db.add_room_order(room_id, order_id)
        elif request.json is not None:
            add_id = request.json.get('add_member')
            if add_id is not None:
                db.add_order_member(order_id, add_id)
            remove_id = request.json.get('remove_member')
            if remove_id is not None:
                db.remove_order_member(order_id, remove_id)
        return self.get(room_id, order_id)

api_view = OrderAPI.as_view('order_api')
