from flask import g
from datetime import timedelta

ex_time = int(timedelta(days=1).total_seconds())

def is_int(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

""" User settings"""

def create_user(user_id):
    g.redis.setex('user:' + user_id + '.name', 'Guest', ex_time)
    g.redis.setex('user:' + user_id + '.color', 'rgb(255, 0, 0)', ex_time)

def user_exists(user_id):
    return g.redis.exists('user:' + user_id + '.name')

def get_user_name(user_id):
    name = g.redis.get('user:' + user_id + '.name')
    return name if name is not None else 'Unknown'

def get_user_color(user_id):
    color = g.redis.get('user:' + user_id + '.color')
    return color if color is not None else 'rgb(0, 0, 0)'

def set_user_name(user_id, name):
    g.redis.setex('user:' + user_id + '.name', name, ex_time)

def set_user_color(user_id, color):
    g.redis.setex('user:' + user_id + '.color', color, ex_time)


""" Wallet """

def get_user_use_credit(user_id):
    credit = g.redis.get('user:' + user_id + '.use_credit')
    return True if credit is not None and int(credit) != 0 else False

def get_user_use_venmo(user_id):
    venmo = g.redis.get('user:' + user_id + '.use_venmo')
    return True if venmo is not None and int(venmo) != 0 else False

def get_user_use_cash(user_id):
    cash = g.redis.get('user:' + user_id + '.use_cash')
    return True if cash is not None and int(cash) != 0 else False

def get_user_cash(user_id):
    return g.redis.hgetall('user:' + user_id + '.cash')

def set_user_use_credit(user_id, credit):
    g.redis.setex('user:' + user_id + '.use_credit', 1 if credit else 0, ex_time)

def set_user_use_venmo(user_id, venmo):
    g.redis.setex('user:' + user_id + '.use_venmo', 1 if venmo else 0, ex_time)

def set_user_use_cash(user_id, cash):
    g.redis.setex('user:' + user_id + '.use_cash', 1 if cash else 0, ex_time)

def set_user_cash(user_id, cash):
    legal_cash = {k:v for (k,v) in cash.iteritems() if is_int(k) and int(k)%100 == 0 and is_int(v)}
    pipe = g.redis.pipeline()
    pipe.hmset('user:' + user_id + '.cash', legal_cash)
    pipe.expire('user:' + user_id + '.cash', ex_time)
    pipe.execute()


""" Rooms """

def create_room(room_id):
    g.redis.setex('room:' + room_id + '.name', 'Untitled', ex_time)
    g.redis.setex('room:' + room_id + '.tax', 0.0875, ex_time)
    g.redis.setex('room:' + room_id + '.tip', 0.15, ex_time)

def join_room(room_id, user_id):
    pipe = g.redis.pipeline()
    pipe.sadd('room:' + room_id + '.members', user_id)
    pipe.expire('room:' + room_id + '.members', ex_time)
    pipe.execute()

def room_exists(room_id):
    return g.redis.exists('room:' + room_id + '.name')

def get_room_members(room_id):
    return list(g.redis.smembers('room:' + room_id + '.members'))

def get_room_name(room_id):
    name = g.redis.get('room:' + room_id + '.name')
    return name if name is not None else 'Unknown'

def get_room_tax(room_id):
    tax = g.redis.get('room:' + room_id + '.tax')
    return tax if tax is not None else 0.00

def get_room_tip(room_id):
    tip = g.redis.get('room:' + room_id + '.tip')
    return tip if tip is not None else 0.00

def set_room_name(room_id, name):
    g.redis.setex('room:' + room_id + '.name', name, ex_time)

def set_room_tax(room_id, tax):
    g.redis.setex('room:' + room_id + '.tax', tax, ex_time)

def set_room_tip(room_id, tip):
    g.redis.setex('room:' + room_id + '.tip', tip, ex_time)

def get_room_orders(room_id):
    return list(g.redis.smembers('room:' + room_id + '.orders'))

def add_room_order(room_id, order_id):
    pipe = g.redis.pipeline()
    pipe.sadd('room:' + room_id + '.orders', order_id)
    pipe.expire('room:' + room_id + '.orders', ex_time)
    pipe.execute()

def remove_room_order(room_id, order_id):
    g.redis.srem('room:' + room_id + '.orders', order_id)

""" Orders """

def order_exists(order_id):
    return g.redis.exists('order:' + order_id + '.name')

def get_order_name(order_id):
    name = g.redis.get('order:' + order_id + '.name')
    return name if name is not None else 'Unknown'

def get_order_price(order_id):
    price = g.redis.get('order:' + order_id + '.price')
    return int(price) if price is not None and is_int(price) else 0

def set_order_name(order_id, name):
    g.redis.setex('order:' + order_id + '.name', name, ex_time)

def set_order_price(order_id, price):
    if is_int(price):
        g.redis.setex('order:' + order_id + '.price', int(price), ex_time)

def get_order_members(order_id):
    return list(g.redis.smembers('order:' + order_id + '.members'))

def add_order_member(order_id, user_id):
    pipe = g.redis.pipeline()
    pipe.sadd('order:' + order_id + '.members', user_id)
    pipe.expire('order:' + order_id + '.members', ex_time)
    pipe.execute()

def remove_order_member(order_id, user_id):
    g.redis.srem('order:' + order_id + '.members', user_id)

def create_order(order_id, user_id):
    g.redis.setex('order:' + order_id + '.name', 'Order Name', ex_time)
    g.redis.setex('order:' + order_id + '.price', 0, ex_time)
    add_order_member(order_id, user_id)
