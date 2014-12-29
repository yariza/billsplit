from flask.views import MethodView
from flask import session, jsonify, abort, request
import db.db as db

def get_payment_methods(user_id):
    methods = []
    if db.get_user_use_credit(user_id):
        methods.append('credit')
    if db.get_user_use_venmo(user_id):
        methods.append('venmo')
    if db.get_user_use_cash(user_id):
        methods.append('cash')
    return methods

class WalletAPI(MethodView):

    def get(self):
        user_id = session['user_id']
        return jsonify(
                use_credit=db.get_user_use_credit(user_id),
                use_venmo=db.get_user_use_venmo(user_id),
                use_cash=db.get_user_use_cash(user_id),
                cash=db.get_user_cash(user_id))

    def put(self):
        user_id = session['user_id']
        use_credit = request.json.get('use_credit')
        use_venmo = request.json.get('use_venmo')
        use_cash = request.json.get('use_cash')
        cash = request.json.get('cash')
        if use_credit is not None:
            db.set_user_use_credit(user_id, use_credit)
        if use_venmo is not None:
            db.set_user_use_venmo(user_id, use_venmo)
        if use_cash is not None:
            db.set_user_use_cash(user_id, use_cash)
        if cash is not None:
            db.set_user_cash(user_id, cash)
        return self.get()

api_view = WalletAPI.as_view('wallet_api')
