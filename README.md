# billsplit

Split group payments, fast and easy!

# API Guidelines

## Wallet

### Get my wallet info

Query:

`GET /api/wallet`

Response:

    {
        "status": ok",
        "results": {
            "venmo_enabled": false,
            "card_enabled": true,
            "cash": {
                "100": 9,
                "500": 0,
                "1000": 1,
                "2000": 3
            }
        }
    }

### Update wallet info

Query:

`PUT /api/wallet`

    {
        "venmo_enabled": true,
        "card_enabled": false
        "cash": {
            "100": 4,
            "2000": 5
        }
    }

Response:

    {
        "status": ok",
        "results": {
            "venmo_enabled": true,
            "card_enabled": false,
            "cash": {
                "100": 4,
                "500": 0,
                "1000": 0,
                "2000": 5
            }
        }
    }

## Rooms

### Create a room

Query:

`POST /api/rooms/<room_id>`

Response:

    {
        "status": "ok",
        "results": {
            "id": "4272099a-f92e-402a-8a6a-b02da16a8549",
            "name": "Room Name",
            "tax": 0.0875,
            "tip": 0.15,
            "orders": [],
            "members": [
                {
                    "name": "Yujin",
                    "color": "#27576B",
                    "id": "d5baf491-3090-478d-9b67-32d81cb18e30",
                    "payment_methods": ["venmo", "cash"]
                }
            ]
        }
    }

or, if something bad happens:

    {
        "status": "error",
        "reason": "Could not retrieve value from Redis"
    }


### Join room/Get info for particular room

Query:

`GET /api/rooms/<room_id>`

Response:

    {
        "status": "ok",
        "results":  {
            "id": "4272099a-f92e-402a-8a6a-b02da16a8549",
            "name": "Indian Food"
            "tax": "0.0875",
            "tip": "0.15",
            "orders": [
                {
                    "name": "Chicken Tika Masala",
                    "price": "1499",
                    "members": [
                        {
                            "name": "Yujin",
                            "color": "#27576B",
                            "id": "d5baf491-3090-478d-9b67-32d81cb18e30",
                            "payment_methods": ["venmo", "cash"]
                        },
                        {
                            "name": "Wenlan",
                            "color": "#6E91A1",
                            "id": "54f7ebbd-3027-499f-9737-5c680c1c04b6",
                            "payment_methods": ["cash"]
                        }
                    ]
                }
            ],
            "members": [
                {
                    "name": "Yujin",
                    "color": "#27576B",
                    "id": "d5baf491-3090-478d-9b67-32d81cb18e30",
                    "payment_methods": ["venmo", "cash"]
                },
                {
                    "name": "Wenlan",
                    "color": "#6E91A1",
                    "id": "54f7ebbd-3027-499f-9737-5c680c1c04b6",
                    "payment_methods": ["cash"]
                },
                {
                    "name": "Mick",
                    "color": "#467386",
                    "id": "88d15551-faeb-4d9d-80f5-0dca125195fd",
                    "payment_methods": ["card", "cash"]
                },
                {
                    "name": "Jeff",
                    "color": "#103D50",
                    "id": "88d15551-faeb-4d9d-80f5-0dca125195fd",
                    "payment_methods": ["card", "cash", "venmo"]
                }
            ]
        }
    }

### Watch a room (long-polling for updates)

Query:

`GET /api/rooms/<room_id>/watch`

Response:

    {
        //same as regular GET response...
    }

The request should block until a change in Redis is detected, or until the
request times out.

### Get room results (long-polling until everyone queries)

Query:

`GET /api/rooms/<room_id>/results`

Response:

    {
        "status": "ok",
        "results": {
            "transactions": [
                {
                    "type": "cash",
                    "amount": 100,
                    "sender": {
                        "name": "Yujin",
                        "color": "#27576B",
                        "id": "d5baf491-3090-478d-9b67-32d81cb18e30",
                        "payment_methods": ["venmo", "cash"]
                    },
                    "receiver": {
                        "name": "Wenlan",
                        "color": "#6E91A1",
                        "id": "54f7ebbd-3027-499f-9737-5c680c1c04b6",
                        "payment_methods": ["cash"]
                    }
                },
                {
                    "type": "venmo",
                    "amount": 423,
                    "sender": {
                        "name": "Mick",
                        "color": "#467386",
                        "id": "88d15551-faeb-4d9d-80f5-0dca125195fd",
                        "payment_methods": ["card", "cash"]
                    },
                    "receiver": {
                        "name": "Yujin",
                        "color": "#27576B",
                        "id": "d5baf491-3090-478d-9b67-32d81cb18e30",
                        "payment_methods": ["venmo", "cash"]
                    }
                }
                //only transactions pertaining to yourself are returned
            ],
            "summary": {
                "target_total": 4089,
                "actual_total": 4200,
                "target_tip": 739,
                "actual_tip": 800,
                "members": [
                    {
                        "name": "Yujin",
                        "color": "#27576B",
                        "id": "d5baf491-3090-478d-9b67-32d81cb18e30",
                        "payment_methods": ["cash", "venmo"]
                        "target_paid": 1739,
                        "actual_paid": 1700
                    },
                    {
                        "name": "Wenlan",
                        "color": "#6E91A1",
                        "id": "54f7ebbd-3027-499f-9737-5c680c1c04b6",
                        "payment_methods": ["cash"]
                        "target_paid": 342,
                        "actual_paid": 400
                    },
                    {
                        "name": "Mick",
                        "color": "#467386",
                        "id": "88d15551-faeb-4d9d-80f5-0dca125195fd",
                        "payment_methods": ["card"]
                        "target_paid": 1531,
                        "actual_paid": 1531
                    },
                    {
                        "name": "Jeff",
                        "color": "#103D50",
                        "id": "88d15551-faeb-4d9d-80f5-0dca125195fd",
                        "payment_methods": ["cash", "venmo"]
                        "target_paid": 1283,
                        "actual_paid": 1300
                    }
                ]
            }
        }
    }

All amounts are in cents. Each bill is a separate transaction; that is, 3 $1
bills result in 3 transaction objects. (Memory risk, I know - but just cap it)
The key payment_methods refers to the actual methods used in the transaction.

## Settings

### Get User Settings

Query:

`GET /api/user/`

Response:

    {
        "name": "Guest",
        "color": "rgb(255, 0, 0)",
        "user_id": "d5baf491-3090-478d-9b67-32d81cb18e30"
    }

### Update User Settings

Query:

`PUT /api/user/`

    {
        "name": "AZIRANIJUY"
    }

Response:

    {
        "name": "AZIRANIJUY",
        "color": "rgb(0, 0, 24)",
        "user_id": "d5baf491-3090-478d-9b67-32d81cb18e30"
    }

`id` cannot be changed.

# Redis Format Guidelines

## Keys

### Wallet

`user:<user_id>.use_venmo`: "false" or "true" - (nil) defaults to false

`user:<user_id>.use_card`: "false" or "true" - (nil) defaults to false

`user:<user_id>.cash`: Redis Hash with following keys/values:

    {
        "100": 9,
        "500": 0,
        "1000": 1,
        "2000": 3
    }

### Rooms

`room:<room_id>.name`: string name

`room:<room_id>.tax`: float

`room:<room_id>.tip`: float

`room:<room_id>.orders: List - each element stored as JSON elements:

    {
        
    }

