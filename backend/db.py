from tinydb import TinyDB, Query
db = TinyDB('db.json')

profiles = db.table('profiles')
matches = db.table('matches')

