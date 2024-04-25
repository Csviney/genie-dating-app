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
    location: str
    preferences: [str]
    liked_by: [int]

    def __init__(self, username: str, password: str, first_name: str, last_name: str, age: int, gender: str, location: str, preferences: [str]):
        self.id = (profiles.all()[-1]['id'] if profiles.all() else 0) + 1
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.gender = gender
        self.location = location
        self.preferences = preferences
        self.liked_by = []

    def to_dict(self):
        return {"id": self.id, "username": self.username, "password": self.password, "first_name": self.first_name, "last_name": self.last_name, "age": self.age, "gender": self.gender,"location": self.location, "preferences": self.preferences, "liked_by": self.liked_by}

def create(data):
    profile = Profile(data.get("username"), data.get("password"), data.get("first_name"), data.get("last_name"), data.get("age"), data.get("gender"), data.get("location"), data.get("preferences") )
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