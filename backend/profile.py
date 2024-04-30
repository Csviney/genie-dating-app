from pydantic import BaseModel
from db import profiles
from tinydb import TinyDB, Query

class Profile():
    id: int
    username: str
    password: str
    first_name: str
    last_name: str
    age: int
    gender: str
    preferences: [str]
    liked_by: [int]
    bio: str

    def __init__(self, username: str, password: str, first_name: str, last_name: str, age: int, gender: str, preferences: [str], bio: str):
        self.id = (profiles.all()[-1]['id'] if profiles.all() else 0) + 1
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.gender = gender
        self.preferences = preferences
        self.liked_by = []
        self.bio = bio

    def to_dict(self):
        return {"id": self.id, "username": self.username, "password": self.password, "first_name": self.first_name, "last_name": self.last_name, "age": self.age, "gender": self.gender, "preferences": self.preferences, "liked_by": self.liked_by, "bio": self.bio}

def create(data):
    profile = Profile(data.get("username"), data.get("password"), data.get("first_name"), data.get("last_name"), data.get("age"), data.get("gender"), data.get("preferences"), data.get("bio"))
    profiles.insert(profile.to_dict())
    return profile.to_dict()

def get(id):
    profile = profiles.get(doc_id=id)
    if profile:
        return profile
    return None

def delete(id):
    profile = profiles.get(doc_id=id)
    if profile:
        profiles.remove(doc_ids=[id])
        return profile
    return None

def update(id, data):
    profile = profiles.get(doc_id=id)
    profile_id = Query()
    if profile:
        profiles.update(data, profile_id.id == id)
        return profile
    return None

def update_by_username(username, data):
    User = Query()
    result = profiles.search(User.username == username)
    if result:
        profiles.update(data, User.username == username)
        return result
    return None

def get_by_username(username):
    User = Query()
    result = profiles.search(User.username == username)
    if result:
        return result[0]
    return None

def check_existing_username(username, profiles):
    for i in profiles:
        if i['username'] == username:
            return True
    return False